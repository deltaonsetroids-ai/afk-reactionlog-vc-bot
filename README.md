# afk-reactionlog-vc-bot

Small self-hosted Discord bot:
- `/afk [reason]` and `?afk [reason]` — AFK status, mention notices, leave-a-message button
- Reaction logging — every emoji add/remove posted as an embed to a log channel
- Stays in one voice channel 24/7 (auto-rejoins if kicked/moved/disconnected)
- `!debate` and `/debate` — random debate prompts, with category and difficulty filters
- `!philosophy` and `/philosophy` — open-ended philosophical prompts

No database, no AI, no external services. Runs on your own bot account.

## 1. Make the bot
1. https://discord.com/developers/applications → New Application → Bot tab → Reset Token (copy it).
2. Bot tab → turn **Message Content Intent** ON.
3. Copy the Application ID (General Information).
4. OAuth2 → URL Generator → scopes `bot` + `applications.commands`; permissions: View Channels, Send Messages, Embed Links, Read Message History, Connect. Open the URL to invite it.
5. Make sure it can Connect to the voice channel and Send/Embed in the log channel.

## 2. Run it
```
git clone <this repo> && cd afk-reactionlog-vc-bot
npm install
cp .env.example .env      # fill it in
npm run deploy            # registers /afk and /reactionlog in your server(s), instant
npm start
```
Then in Discord: `/reactionlog set channel:#your-log-channel`.

Keep it alive: `npm i -g pm2 && pm2 start index.js --name bot && pm2 save`, then `pm2 startup` (Linux/macOS) or `pm2-windows-startup` (Windows).

## Notes
- `/reactionlog set|off|show` needs Manage Server/Admin, or an ID in `DISCORD_OWNER_USER_IDS`.
- Reaction-log config is stored in `data/reactionlog.json` (created on first use, gitignored).
- AFK status is in memory; a restart clears it.
- Tests: `npm test`.

## Debate and philosophy
`!debate` chooses from 132 debate topics; `!philosophy` chooses from 40 open-ended prompts. You can optionally include a category or difficulty after the prefix. Slash commands include drop-down options for both. Difficulty: `easy`, `2 braincells needed`, `mind boggling`. To register slash commands after changing them, run `npm run deploy` with the Discord environment variables set.
