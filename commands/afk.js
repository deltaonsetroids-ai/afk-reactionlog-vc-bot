const afk = require('../lib/afk')

async function handleCommand(interaction) {
  const reason = afk.sanitizeReason(interaction.options.getString('reason') || 'AFK', interaction)
  afk.setAfk(interaction.guildId, interaction.user.id, reason)
  await interaction.reply({ content: `You're now AFK: ${reason} — since ${afk.discordRelativeTime(Date.now())}`, allowedMentions: { parse: [] } })
}

const AFK_COMMANDS = new Set(['afk'])

module.exports = { handleCommand, AFK_COMMANDS }
