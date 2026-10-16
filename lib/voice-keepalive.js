// Keeps the bot parked in one voice channel, forever. No TTS, no queue, no DB.
// One single-flight join routine + a 10s watchdog covers every way a
// connection can die (network drop, kick, move, stuck Signalling, failed join).
// Needs: GuildVoiceStates intent, Connect permission on the channel.

const {
  joinVoiceChannel,
  getVoiceConnection,
  VoiceConnectionStatus,
  entersState,
} = require('@discordjs/voice')

const CHECK_MS = 10_000
let joining = false
let watchdog = null
let lastJoinAt = 0

function channelId() {
  return (process.env.VOICE_CHANNEL_ID || '').trim()
}

function start(client) {
  if (!channelId()) {
    console.warn('VOICE_CHANNEL_ID not set — voice keep-alive disabled')
    return
  }
  if (!watchdog) {
    watchdog = setInterval(() => ensure(client), CHECK_MS)
    client.on('voiceStateUpdate', (oldS, newS) => {
      if (newS.id === client.user?.id && newS.channelId !== oldS.channelId) {
        setTimeout(() => ensure(client), 2_000)
      }
    })
    client.on('shardResume', () => setTimeout(() => ensure(client), 3_000))
  }
  return ensure(client)
}

async function ensure(client) {
  if (joining) return
  try {
    const channel = await client.channels.fetch(channelId()).catch(() => null)
    if (!channel || !channel.isVoiceBased()) return
    const existing = getVoiceConnection(channel.guildId)
    const healthy =
      existing &&
      existing.state.status === VoiceConnectionStatus.Ready &&
      existing.joinConfig.channelId === channel.id
    if (healthy) return
    // Give a transient Signalling/Connecting connection a grace period.
    if (
      existing &&
      existing.state.status !== VoiceConnectionStatus.Disconnected &&
      existing.state.status !== VoiceConnectionStatus.Destroyed &&
      existing.joinConfig.channelId === channel.id &&
      Date.now() - lastJoinAt < 30_000
    ) return
    await join(client)
  } catch (error) {
    console.error('Voice keep-alive check failed:', error)
  }
}

async function join(client) {
  if (joining) return
  joining = true
  lastJoinAt = Date.now()
  try {
    const channel = await client.channels.fetch(channelId())
    if (!channel || !channel.isVoiceBased()) {
      console.error(`Voice channel ${channelId()} not found or not a voice channel`)
      return
    }
    const existing = getVoiceConnection(channel.guildId)
    if (existing) {
      try { existing.destroy() } catch {}
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: true,
    })

    connection.on('error', (error) => console.error('Voice connection error:', error))

    connection.on(VoiceConnectionStatus.Disconnected, async () => {
      try {
        // Discord moved us / is reconnecting: wait briefly for it to recover.
        await Promise.race([
          entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
          entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
        ])
      } catch {
        try { connection.destroy() } catch {}
      }
    })

    connection.on(VoiceConnectionStatus.Destroyed, () => {
      setTimeout(() => ensure(client), 3_000)
    })

    try {
      await entersState(connection, VoiceConnectionStatus.Ready, 20_000)
    } catch (error) {
      console.error('Voice join did not become ready, retrying:', error.message || error)
      try { connection.destroy() } catch {}
      return
    }
    console.log(`Joined voice: ${channel.name} in ${channel.guild.name}`)
  } finally {
    joining = false
  }
}

module.exports = { start, ensure }
