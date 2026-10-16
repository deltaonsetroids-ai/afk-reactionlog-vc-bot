// AFK status, triggered by a text prefix ("?afk") or slash command.
// Meant to be quick to type mid-conversation. In-memory only:
// AFK is a transient, session-like status, same tradeoff as conversation
// history in lib/memory.js.

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, MessageFlags } = require('discord.js')

const PREFIX = '?afk'

const afkStatus = new Map() // `${guildId}:${userId}` -> { reason, since }
const afkMessages = new Map() // `${guildId}:${userId}` -> [{ fromId, fromTag, content, url, createdAt }]
const afkPromptMessages = new Map() // bot prompt message id -> original user message url

function keyFor(guildId, userId) {
  return `${guildId || 'dm'}:${userId}`
}

function discordRelativeTime(msOrDate) {
  const timestampMs = typeof msOrDate === 'number' ? msOrDate : Date.parse(msOrDate)
  return `<t:${Math.floor(timestampMs / 1000)}:R>`
}


function mentionNameFromMessage(message, id) {
  const user = message.mentions?.users?.get?.(id)
  const member = message.mentions?.members?.get?.(id)
  return member?.displayName || user?.globalName || user?.username || `user ${id}`
}

function sanitizeReason(rawReason, source) {
  let reason = rawReason || 'AFK'
  reason = reason.replace(/<@!?(\d+)>/g, (_, id) => `@${mentionNameFromMessage(source, id)}`)
  reason = reason.replace(/<@&(\d+)>/g, (_, id) => {
    const role = source.guild?.roles?.cache?.get?.(id) || source.member?.guild?.roles?.cache?.get?.(id)
    return `@${role?.name || `role ${id}`}`
  })
  reason = reason.replace(/@everyone/g, '@ everyone').replace(/@here/g, '@ here')
  return reason.trim() || 'AFK'
}

function cleanMessageContent(message) {
  return message.content
    .replace(/<@!?\d+>/g, '')
    .replace(/<@&\d+>/g, '')
    .replace(/<#\d+>/g, '')
    .trim()
}

function storeAfkMessage(guildId, userId, { fromId, fromTag, content, url }) {
  const key = keyFor(guildId, userId)
  const items = afkMessages.get(key) || []
  items.push({
    fromId,
    fromTag: fromTag || 'unknown user',
    content: (content || '(no message text)').slice(0, 500),
    url: url || null,
    createdAt: Date.now(),
  })
  afkMessages.set(key, items.slice(-20))
  return afkMessages.get(key).length
}

function buildLeaveMessageButton(guildId, userId) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`afkmsg:open:${guildId || 'dm'}:${userId}`)
      .setLabel('Leave AFK message')
      .setStyle(ButtonStyle.Primary)
  )
}

async function handleButton(interaction) {
  const [, action, guildId, userId] = interaction.customId.split(':')
  if (action !== 'open') return false
  const entry = afkStatus.get(keyFor(guildId, userId))
  if (!entry) {
    await interaction.reply({ content: 'They are not AFK anymore.', flags: MessageFlags.Ephemeral })
    return true
  }

  const modal = new ModalBuilder()
    .setCustomId(`afkmsg:submit:${guildId}:${userId}:${interaction.message?.id || 'unknown'}`)
    .setTitle('Leave an AFK message')
  const input = new TextInputBuilder()
    .setCustomId('message')
    .setLabel('What should I show them when they return?')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true)
    .setMaxLength(500)
  modal.addComponents(new ActionRowBuilder().addComponents(input))
  await interaction.showModal(modal)
  return true
}

async function handleModalSubmit(interaction) {
  const [, action, guildId, userId, promptMessageId] = interaction.customId.split(':')
  if (action !== 'submit') return false
  const entry = afkStatus.get(keyFor(guildId, userId))
  if (!entry) {
    await interaction.reply({ content: 'They are not AFK anymore, so I did not save the message.', flags: MessageFlags.Ephemeral })
    return true
  }
  const content = interaction.fields.getTextInputValue('message')
  const count = storeAfkMessage(guildId, userId, {
    fromId: interaction.user.id,
    fromTag: interaction.user.tag || interaction.user.username,
    content,
    url: afkPromptMessages.get(promptMessageId)?.url || null,
  })
  afkPromptMessages.delete(promptMessageId)
  await interaction.reply({ content: `Saved. I’ll show it to them when they come back (${count} saved).`, flags: MessageFlags.Ephemeral })
  return true
}

// Shared by both entry points: the "?afk" text trigger and the /afk slash command.
function setAfk(guildId, userId, reason) {
  afkStatus.set(keyFor(guildId, userId), { reason: reason || 'AFK', since: Date.now() })
}

// Handles both the "?afk <reason>" trigger and the passive checks (clearing
// the sender's own AFK status, flagging AFK users they @mentioned). Returns
// true if it replied, so the caller can skip other message handling.
async function handleMessage(message) {
  if (message.author.bot) return false

  const guildId = message.guildId

  if (message.content.toLowerCase().startsWith(PREFIX)) {
    const reason = sanitizeReason(message.content.slice(PREFIX.length).trim() || 'AFK', message)
    setAfk(guildId, message.author.id, reason)
    await message.reply({ content: `You're now AFK: ${reason} — since ${discordRelativeTime(Date.now())}`, allowedMentions: { parse: [] } })
    return true
  }

  const ownKey = keyFor(guildId, message.author.id)
  const own = afkStatus.get(ownKey)
  if (own) {
    afkStatus.delete(ownKey)
    const messages = afkMessages.get(ownKey) || []
    afkMessages.delete(ownKey)
    await message.reply(`Welcome back — I removed your AFK status (you went AFK ${discordRelativeTime(own.since)}).`)
    if (messages.length) {
      const lines = messages.map((item, index) => {
        const link = item.url ? ` — ${item.url}` : ''
        return `${index + 1}. **${item.fromTag}** ${discordRelativeTime(item.createdAt)}: ${item.content}${link}`
      })
      const header = `You got ${messages.length} AFK message${messages.length === 1 ? '' : 's'} while you were gone:`
      const chunks = []
      let current = header
      for (const line of lines) {
        if ((current + '\n' + line).length > 1900) {
          chunks.push(current)
          current = line
        } else {
          current += '\n' + line
        }
      }
      chunks.push(current)
      let sentDm = false
      try {
        const dm = await message.author.createDM()
        for (const chunk of chunks) await dm.send(chunk)
        sentDm = true
      } catch (error) {
        console.error('Failed to DM AFK messages:', error)
      }
    }
  }

  const mentionedUsers = [...message.mentions.users.values()].filter((u) => u.id !== message.author.id)
  for (const user of mentionedUsers) {
    const entry = afkStatus.get(keyFor(guildId, user.id))
    if (entry) {
      const prompt = await message.reply({
        content: `${user.username} is AFK: ${entry.reason} — since ${discordRelativeTime(entry.since)}. Want to leave them a message for when they come back?`,
        allowedMentions: { parse: [] },
        components: [buildLeaveMessageButton(guildId, user.id)],
      })
      if (prompt?.id) afkPromptMessages.set(prompt.id, { url: message.url || null })
    }
  }

  return false
}

module.exports = { handleMessage, handleButton, handleModalSubmit, setAfk, PREFIX, discordRelativeTime, sanitizeReason, storeAfkMessage }
