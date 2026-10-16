// Reaction logging (lite): same embed as the full bot, but config lives in
// data/reactionlog.json instead of Supabase. Shape: { "<guildId>": { log_channel_id, enabled } }

const fs = require('fs')
const path = require('path')
const { EmbedBuilder } = require('discord.js')

const CONFIG_FILE = process.env.REACTIONLOG_FILE || path.join(__dirname, '..', 'data', 'reactionlog.json')
const ADD_COLOR = 0x57f287
const REMOVE_COLOR = 0xed4245

function load() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')) || {}
  } catch {
    return {}
  }
}

function save(all) {
  fs.mkdirSync(path.dirname(CONFIG_FILE), { recursive: true })
  const tmp = `${CONFIG_FILE}.tmp`
  fs.writeFileSync(tmp, JSON.stringify(all, null, 2))
  fs.renameSync(tmp, CONFIG_FILE)
}

async function getConfig(guildId) {
  if (!guildId) return null
  return load()[guildId] || null
}

async function setLogChannel(guildId, channelId) {
  const all = load()
  all[guildId] = { log_channel_id: channelId, enabled: true, updated_at: new Date().toISOString() }
  save(all)
}

async function setEnabled(guildId, enabled) {
  const all = load()
  all[guildId] = { ...(all[guildId] || {}), enabled, updated_at: new Date().toISOString() }
  save(all)
}

function formatEmoji(emoji) {
  return emoji?.id ? `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>` : emoji?.toString?.() || String(emoji)
}
const emojiField = formatEmoji

function contentSummary(message) {
  if (message.content) return message.content.slice(0, 1024)
  const firstAttachment = message.attachments?.first?.()
  if (firstAttachment) return `[📎 ${firstAttachment.name}](${firstAttachment.url})`
  if (message.embeds?.length) return '*(embed content, no text)*'
  return '*(no content)*'
}

async function logReaction(client, guildId, reaction, user, action) {
  const config = await getConfig(guildId).catch((error) => {
    console.error('Reaction-log config lookup failed:', error)
    return null
  })
  if (!config?.enabled || !config.log_channel_id) return
  if (reaction.message.channelId === config.log_channel_id) return

  const logChannel = await client.channels.fetch(config.log_channel_id).catch(() => null)
  if (!logChannel?.isTextBased?.()) return

  const message = reaction.message
  const channelMention = message.channel ? `<#${message.channelId}>` : 'a channel'
  const channelLabel = message.channel?.name ? `#${message.channel.name}` : message.channelId
  const authorTag = message.author?.tag || message.author?.username || 'someone'
  const authorMention = message.author ? `<@${message.author.id}>` : ''
  const verb = action === 'remove' ? 'removed by' : 'added by'
  const totalNow = reaction.count ?? 0

  const embed = new EmbedBuilder()
    .setColor(action === 'remove' ? REMOVE_COLOR : ADD_COLOR)
    .setAuthor({
      name: `${user.tag ?? user.username} (${user.id})`,
      iconURL: user.displayAvatarURL?.() ?? undefined,
    })
    .setDescription(`${emojiField(reaction.emoji)} ${verb} <@${user.id}> on [a message](${message.url}) in ${channelMention}`)
    .addFields(
      { name: 'Emoji', value: emojiField(reaction.emoji), inline: false },
      { name: 'Message Author', value: `${authorTag}${authorMention ? ` (${authorMention})` : ''}`, inline: false },
      { name: 'Total Now', value: String(totalNow), inline: false },
      { name: 'Content', value: contentSummary(message), inline: false }
    )
    .setFooter({ text: `${channelLabel} • msg ${message.id}` })
    .setTimestamp(new Date())

  await logChannel.send({ embeds: [embed], allowedMentions: { parse: [] } }).catch((error) =>
    console.error('Failed to send reaction log:', error)
  )
}

module.exports = { getConfig, setLogChannel, setEnabled, logReaction, CONFIG_FILE }
