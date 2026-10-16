const { MessageFlags, PermissionFlagsBits } = require('discord.js')
const reactionlog = require('../lib/reactionlog')

// Allowed: anyone in DISCORD_OWNER_USER_IDS, or members with Manage Server / Administrator.
const OWNER_IDS = new Set(
  (process.env.DISCORD_OWNER_USER_IDS || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
)

async function handleCommand(interaction) {
  if (!interaction.guildId) {
    await interaction.reply({ content: 'This only works in a server.', flags: MessageFlags.Ephemeral })
    return
  }
  const perms = interaction.memberPermissions
  const allowed = OWNER_IDS.has(interaction.user.id) || perms?.has(PermissionFlagsBits.ManageGuild) || perms?.has(PermissionFlagsBits.Administrator)
  if (!allowed) {
    await interaction.reply({ content: "You don't have permission to configure reaction logging.", flags: MessageFlags.Ephemeral })
    return
  }

  const sub = interaction.options.getSubcommand()

  if (sub === 'set') {
    const channel = interaction.options.getChannel('channel', true)
    await reactionlog.setLogChannel(interaction.guildId, channel.id)
    await interaction.reply({
      content: `Reaction logging is on — every reaction add/remove in this server will be posted to ${channel}.`,
      flags: MessageFlags.Ephemeral,
    })
    return
  }

  if (sub === 'off') {
    await reactionlog.setEnabled(interaction.guildId, false)
    await interaction.reply({ content: 'Reaction logging is off.', flags: MessageFlags.Ephemeral })
    return
  }

  if (sub === 'show') {
    const config = await reactionlog.getConfig(interaction.guildId)
    if (!config?.enabled || !config.log_channel_id) {
      await interaction.reply({ content: 'Reaction logging is off.', flags: MessageFlags.Ephemeral })
      return
    }
    await interaction.reply({ content: `Reaction logging is on, posting to <#${config.log_channel_id}>.`, flags: MessageFlags.Ephemeral })
  }
}

const REACTIONLOG_COMMANDS = new Set(['reactionlog'])

module.exports = { handleCommand, REACTIONLOG_COMMANDS }
