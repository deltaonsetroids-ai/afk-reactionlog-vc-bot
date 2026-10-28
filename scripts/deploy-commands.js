// Registers /afk and /reactionlog on YOUR bot, as guild commands (instant).
// Only touches the guilds in GUILD_IDS (default: ALLOWED_GUILD_IDS). Safe: guild-scoped PUT only
// replaces this bot's commands in those guilds, never global ones.
require('dotenv').config()
const { REST, Routes, SlashCommandBuilder } = require('discord.js')
const conversation = require('../commands/conversation')

const token = process.env.DISCORD_BOT_TOKEN
const clientId = process.env.DISCORD_CLIENT_ID
const guilds = (process.env.GUILD_IDS || process.env.ALLOWED_GUILD_IDS || '').split(',').map((s) => s.trim()).filter(Boolean)
if (!token || !clientId || !guilds.length) {
  console.error('Need DISCORD_BOT_TOKEN, DISCORD_CLIENT_ID and GUILD_IDS (or ALLOWED_GUILD_IDS) in .env')
  process.exit(1)
}

const promptCommands = ['debate', 'philosophy'].map((kind) => new SlashCommandBuilder()
  .setName(kind)
  .setDescription(kind === 'debate' ? 'Start a debate with a random topic' : 'Get a thought-provoking philosophy question')
  .addStringOption((o) => o.setName('category').setDescription('Topic category')
    .addChoices(...conversation.CATEGORIES[kind].map((c) => ({ name: c, value: c }))))
  .addStringOption((o) => o.setName('difficulty').setDescription('Question difficulty')
    .addChoices(...conversation.LEVELS.map((d) => ({ name: d, value: d })))))
const body = [
  new SlashCommandBuilder()
    .setName('afk')
    .setDescription('Mark yourself AFK — clears automatically next time you speak')
    .addStringOption((o) => o.setName('reason').setDescription("Why you're away")),
  new SlashCommandBuilder()
    .setName('reactionlog')
    .setDescription('Manage Server: log every emoji reaction add/remove to a channel')
    .addSubcommand((s) =>
      s.setName('set').setDescription('Turn on reaction logging and set/change the channel')
        .addChannelOption((o) => o.setName('channel').setDescription('Channel to post reaction logs to').setRequired(true)))
    .addSubcommand((s) => s.setName('off').setDescription('Turn reaction logging off'))
    .addSubcommand((s) => s.setName('show').setDescription('Show the current reaction-log config')),
  ...promptCommands,
].map((c) => c.toJSON())

const rest = new REST().setToken(token)
;(async () => {
  for (const g of guilds) {
    try {
      await rest.put(Routes.applicationGuildCommands(clientId, g), { body })
      console.log(`Registered ${body.length} commands in guild ${g}`)
    } catch (e) {
      console.error(`Guild ${g} failed: ${e.message} (is the bot invited there with the applications.commands scope?)`)
    }
  }
})()
