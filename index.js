require('dotenv').config()
const { Client, GatewayIntentBits, Events, MessageFlags } = require('discord.js')
const afk = require('./lib/afk')
const afkCommands = require('./commands/afk')
const reactionlog = require('./lib/reactionlog')
const reactionlogCommands = require('./commands/reactionlog')
const voiceKeepalive = require('./lib/voice-keepalive')

// Optional guild lock, same as the full bot: unset = every server allowed.
const ALLOWED_GUILD_IDS = new Set(
  (process.env.ALLOWED_GUILD_IDS || '').split(',').map((id) => id.trim()).filter(Boolean)
)
const isGuildApproved = (guildId) => !guildId || ALLOWED_GUILD_IDS.size === 0 || ALLOWED_GUILD_IDS.has(guildId)

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // privileged: ?afk + mention checks
    GatewayIntentBits.GuildMessageReactions, // reaction logging
    GatewayIntentBits.GuildVoiceStates, // permanent VC
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

client.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`)
  voiceKeepalive.start(c)
})

for (const [event, action] of [
  [Events.MessageReactionAdd, 'add'],
  [Events.MessageReactionRemove, 'remove'],
]) {
  client.on(event, async (reaction, user) => {
    if (user.bot) return
    try {
      if (reaction.partial) await reaction.fetch()
      if (reaction.message.partial) await reaction.message.fetch()
    } catch (error) {
      console.error('Failed to fetch partial reaction:', error)
      return
    }
    if (!isGuildApproved(reaction.message.guildId)) return
    reactionlog
      .logReaction(client, reaction.message.guildId, reaction, user, action)
      .catch((error) => console.error('Reaction-log handler error:', error))
  })
}

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return
  if (message.guildId && !isGuildApproved(message.guildId)) return
  await afk.handleMessage(message).catch((error) => console.error('AFK handler error:', error))
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.guildId && !isGuildApproved(interaction.guildId)) return

  if (interaction.isButton()) {
    if (interaction.customId.startsWith('afkmsg:')) {
      await afk.handleButton(interaction).catch((error) => console.error('AFK message button failed:', error))
    }
    return
  }
  if (interaction.isModalSubmit?.()) {
    if (interaction.customId.startsWith('afkmsg:')) {
      await afk.handleModalSubmit(interaction).catch((error) => console.error('AFK message modal failed:', error))
    }
    return
  }
  if (!interaction.isChatInputCommand()) return

  const handler = afkCommands.AFK_COMMANDS.has(interaction.commandName)
    ? afkCommands
    : reactionlogCommands.REACTIONLOG_COMMANDS.has(interaction.commandName)
      ? reactionlogCommands
      : null
  if (!handler) return // other global commands belong to the full bot; stay silent

  try {
    await handler.handleCommand(interaction)
  } catch (error) {
    console.error(`Error handling /${interaction.commandName}:`, error)
    if (interaction.replied || interaction.deferred) {
      await interaction.editReply('Something went wrong.').catch(() => {})
    } else {
      await interaction.reply({ content: 'Something went wrong.', flags: MessageFlags.Ephemeral }).catch(() => {})
    }
  }
})

process.on('unhandledRejection', (error) => console.error('Unhandled rejection:', error))
client.login(process.env.DISCORD_BOT_TOKEN)
