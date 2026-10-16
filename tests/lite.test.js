const test = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const os = require('os')
const path = require('path')

process.env.REACTIONLOG_FILE = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'rl-')), 'rl.json')
const reactionlog = require('../lib/reactionlog')
const afk = require('../lib/afk')

test('reactionlog config persists to file, no DB', async () => {
  assert.equal(await reactionlog.getConfig('g1'), null)
  await reactionlog.setLogChannel('g1', 'c1')
  assert.deepEqual((({ log_channel_id, enabled }) => ({ log_channel_id, enabled }))(await reactionlog.getConfig('g1')), { log_channel_id: 'c1', enabled: true })
  await reactionlog.setEnabled('g1', false)
  const cfg = await reactionlog.getConfig('g1')
  assert.equal(cfg.enabled, false)
  assert.equal(cfg.log_channel_id, 'c1')
})

test('reactionlog sends an embed to the log channel, skips when off or same channel', async () => {
  await reactionlog.setLogChannel('g2', 'log')
  const sent = []
  const client = { channels: { fetch: async () => ({ isTextBased: () => true, send: async (p) => sent.push(p) }) } }
  const reaction = {
    emoji: { id: null, name: '👍', toString: () => '👍' },
    count: 2,
    message: { id: 'm1', channelId: 'c9', url: 'u', content: 'hi', channel: { name: 'gen' }, author: { id: 'a', username: 'bob' } },
  }
  const user = { id: 'u1', username: 'amy', displayAvatarURL: () => undefined }
  await reactionlog.logReaction(client, 'g2', reaction, user, 'add')
  assert.equal(sent.length, 1)
  assert.equal(sent[0].embeds[0].data.fields[0].value, '👍')
  reaction.message.channelId = 'log'
  await reactionlog.logReaction(client, 'g2', reaction, user, 'add')
  assert.equal(sent.length, 1)
  await reactionlog.setEnabled('g2', false)
  reaction.message.channelId = 'c9'
  await reactionlog.logReaction(client, 'g2', reaction, user, 'remove')
  assert.equal(sent.length, 1)
})

test('?afk sets status, mention notice fires, own message clears it', async () => {
  const replies = []
  const mk = (id, content, mentions = []) => ({
    author: { id, bot: false, username: id, createDM: async () => ({ send: async () => {} }) },
    guildId: 'G', content, url: 'url',
    mentions: { users: new Map(mentions.map((m) => [m.id, m])), members: new Map() },
    reply: async (p) => { replies.push(typeof p === 'string' ? p : p.content); return { id: 'p' + replies.length } },
  })
  assert.equal(await afk.handleMessage(mk('u1', '?afk lunch')), true)
  assert.match(replies.at(-1), /now AFK: lunch/)
  await afk.handleMessage(mk('u2', 'hey', [{ id: 'u1', username: 'u1' }]))
  assert.match(replies.at(-1), /u1 is AFK: lunch/)
  await afk.handleMessage(mk('u1', 'back'))
  assert.match(replies.at(-1), /Welcome back/)
})
