// Conversation prompts for De1ta Lite. No external requests or mentions.
const BANK = [
  {
    "kind": "debate",
    "category": "ethics",
    "difficulty": "easy",
    "question": "Is it ever acceptable to lie to protect someone's feelings?"
  },
  {
    "kind": "debate",
    "category": "ethics",
    "difficulty": "2 braincells needed",
    "question": "Should intentions matter more than consequences?"
  },
  {
    "kind": "debate",
    "category": "ethics",
    "difficulty": "mind boggling",
    "question": "Can a good person repeatedly do bad things?"
  },
  {
    "kind": "debate",
    "category": "ethics",
    "difficulty": "easy",
    "question": "Should people be judged by their worst mistake?"
  },
  {
    "kind": "debate",
    "category": "ethics",
    "difficulty": "2 braincells needed",
    "question": "Is doing nothing a moral choice?"
  },
  {
    "kind": "debate",
    "category": "ethics",
    "difficulty": "mind boggling",
    "question": "Can revenge ever be justice?"
  },
  {
    "kind": "debate",
    "category": "ethics",
    "difficulty": "easy",
    "question": "Would a world without privacy be more honest or less free?"
  },
  {
    "kind": "debate",
    "category": "ethics",
    "difficulty": "2 braincells needed",
    "question": "Is it ethical to break a rule that causes harm?"
  },
  {
    "kind": "debate",
    "category": "ethics",
    "difficulty": "mind boggling",
    "question": "Do we owe strangers as much kindness as friends?"
  },
  {
    "kind": "debate",
    "category": "ethics",
    "difficulty": "easy",
    "question": "Can fairness require treating people differently?"
  },
  {
    "kind": "debate",
    "category": "ethics",
    "difficulty": "2 braincells needed",
    "question": "Should forgiveness have to be earned?"
  },
  {
    "kind": "debate",
    "category": "ethics",
    "difficulty": "mind boggling",
    "question": "Is an unfair law still worth obeying?"
  },
  {
    "kind": "debate",
    "category": "technology",
    "difficulty": "easy",
    "question": "Should AI-generated art qualify for the same awards as human art?"
  },
  {
    "kind": "debate",
    "category": "technology",
    "difficulty": "2 braincells needed",
    "question": "Should schools allow AI assistants on all assignments?"
  },
  {
    "kind": "debate",
    "category": "technology",
    "difficulty": "mind boggling",
    "question": "Should social media feeds be chronological by default?"
  },
  {
    "kind": "debate",
    "category": "technology",
    "difficulty": "easy",
    "question": "Do companies have a duty to explain their algorithms?"
  },
  {
    "kind": "debate",
    "category": "technology",
    "difficulty": "2 braincells needed",
    "question": "Should everyone have a legal right to be forgotten online?"
  },
  {
    "kind": "debate",
    "category": "technology",
    "difficulty": "mind boggling",
    "question": "Should realistic AI voices require consent from the person imitated?"
  },
  {
    "kind": "debate",
    "category": "technology",
    "difficulty": "easy",
    "question": "Should autonomous cars prioritize passengers or bystanders?"
  },
  {
    "kind": "debate",
    "category": "technology",
    "difficulty": "2 braincells needed",
    "question": "Is convenience worth giving up personal data?"
  },
  {
    "kind": "debate",
    "category": "technology",
    "difficulty": "mind boggling",
    "question": "Should powerful AI systems be open source?"
  },
  {
    "kind": "debate",
    "category": "technology",
    "difficulty": "easy",
    "question": "Should robots ever have legal rights?"
  },
  {
    "kind": "debate",
    "category": "technology",
    "difficulty": "2 braincells needed",
    "question": "Do recommendation algorithms make culture less original?"
  },
  {
    "kind": "debate",
    "category": "technology",
    "difficulty": "mind boggling",
    "question": "Should internet access be considered a basic right?"
  },
  {
    "kind": "debate",
    "category": "society",
    "difficulty": "easy",
    "question": "Should voting be compulsory?"
  },
  {
    "kind": "debate",
    "category": "society",
    "difficulty": "2 braincells needed",
    "question": "Is competition better than cooperation for progress?"
  },
  {
    "kind": "debate",
    "category": "society",
    "difficulty": "mind boggling",
    "question": "Should public transport be free?"
  },
  {
    "kind": "debate",
    "category": "society",
    "difficulty": "easy",
    "question": "Should universities prioritize skill over grades?"
  },
  {
    "kind": "debate",
    "category": "society",
    "difficulty": "2 braincells needed",
    "question": "Do celebrities have a responsibility to be role models?"
  },
  {
    "kind": "debate",
    "category": "society",
    "difficulty": "mind boggling",
    "question": "Should everyone be required to do community service?"
  },
  {
    "kind": "debate",
    "category": "society",
    "difficulty": "easy",
    "question": "Is individual freedom more important than collective safety?"
  },
  {
    "kind": "debate",
    "category": "society",
    "difficulty": "2 braincells needed",
    "question": "Should schools start later in the morning?"
  },
  {
    "kind": "debate",
    "category": "society",
    "difficulty": "mind boggling",
    "question": "Should cities prioritize cyclists over cars?"
  },
  {
    "kind": "debate",
    "category": "society",
    "difficulty": "easy",
    "question": "Should governments regulate addictive app design?"
  },
  {
    "kind": "debate",
    "category": "society",
    "difficulty": "2 braincells needed",
    "question": "Is meritocracy possible when people start with different advantages?"
  },
  {
    "kind": "debate",
    "category": "society",
    "difficulty": "mind boggling",
    "question": "Should every adult receive a basic income?"
  },
  {
    "kind": "debate",
    "category": "science",
    "difficulty": "easy",
    "question": "Should humanity prioritize ocean exploration over space exploration?"
  },
  {
    "kind": "debate",
    "category": "science",
    "difficulty": "2 braincells needed",
    "question": "Should extinct species be brought back if possible?"
  },
  {
    "kind": "debate",
    "category": "science",
    "difficulty": "mind boggling",
    "question": "Should we edit human genes to prevent disease?"
  },
  {
    "kind": "debate",
    "category": "science",
    "difficulty": "easy",
    "question": "Is funding space colonies more valuable than solving problems on Earth?"
  },
  {
    "kind": "debate",
    "category": "science",
    "difficulty": "2 braincells needed",
    "question": "Should scientific experiments ever be kept secret?"
  },
  {
    "kind": "debate",
    "category": "science",
    "difficulty": "mind boggling",
    "question": "Should we try to contact intelligent alien civilizations?"
  },
  {
    "kind": "debate",
    "category": "science",
    "difficulty": "easy",
    "question": "Would discovering alien life unite humanity?"
  },
  {
    "kind": "debate",
    "category": "science",
    "difficulty": "2 braincells needed",
    "question": "Should machines make scientific discoveries without human supervision?"
  },
  {
    "kind": "debate",
    "category": "science",
    "difficulty": "mind boggling",
    "question": "Should we preserve ecosystems even when doing so limits development?"
  },
  {
    "kind": "debate",
    "category": "science",
    "difficulty": "easy",
    "question": "If we could predict natural disasters perfectly, who should control that information?"
  },
  {
    "kind": "debate",
    "category": "science",
    "difficulty": "2 braincells needed",
    "question": "Should we build habitats on other planets before exploring their ecosystems?"
  },
  {
    "kind": "debate",
    "category": "science",
    "difficulty": "mind boggling",
    "question": "Is a theory useful even if it cannot yet be tested?"
  },
  {
    "kind": "debate",
    "category": "gaming",
    "difficulty": "easy",
    "question": "Should game studios be allowed to sell gameplay advantages?"
  },
  {
    "kind": "debate",
    "category": "gaming",
    "difficulty": "2 braincells needed",
    "question": "Are difficulty settings essential for accessibility?"
  },
  {
    "kind": "debate",
    "category": "gaming",
    "difficulty": "mind boggling",
    "question": "Should games have an offline mode whenever technically possible?"
  },
  {
    "kind": "debate",
    "category": "gaming",
    "difficulty": "easy",
    "question": "Are remakes less valuable than entirely new games?"
  },
  {
    "kind": "debate",
    "category": "gaming",
    "difficulty": "2 braincells needed",
    "question": "Should players own digital games permanently?"
  },
  {
    "kind": "debate",
    "category": "gaming",
    "difficulty": "mind boggling",
    "question": "Are spoilers ever acceptable without a warning?"
  },
  {
    "kind": "debate",
    "category": "gaming",
    "difficulty": "easy",
    "question": "Should developers ban players for using harmless exploits?"
  },
  {
    "kind": "debate",
    "category": "gaming",
    "difficulty": "2 braincells needed",
    "question": "Is a game still good if its story is weak but gameplay is excellent?"
  },
  {
    "kind": "debate",
    "category": "gaming",
    "difficulty": "mind boggling",
    "question": "Should competitive games use skill-based matchmaking?"
  },
  {
    "kind": "debate",
    "category": "gaming",
    "difficulty": "easy",
    "question": "Should game AI adapt to each player's skill automatically?"
  },
  {
    "kind": "debate",
    "category": "gaming",
    "difficulty": "2 braincells needed",
    "question": "Do live-service games encourage unhealthy play habits?"
  },
  {
    "kind": "debate",
    "category": "gaming",
    "difficulty": "mind boggling",
    "question": "Should fan-made mods be allowed in commercial games?"
  },
  {
    "kind": "debate",
    "category": "hypotheticals",
    "difficulty": "easy",
    "question": "If you could erase one invention from history, should you?"
  },
  {
    "kind": "debate",
    "category": "hypotheticals",
    "difficulty": "2 braincells needed",
    "question": "If a machine could perfectly predict your choices, would you still be free?"
  },
  {
    "kind": "debate",
    "category": "hypotheticals",
    "difficulty": "mind boggling",
    "question": "If everyone could read minds for one day, would society improve?"
  },
  {
    "kind": "debate",
    "category": "hypotheticals",
    "difficulty": "easy",
    "question": "If an AI could govern better than humans, should it?"
  },
  {
    "kind": "debate",
    "category": "hypotheticals",
    "difficulty": "2 braincells needed",
    "question": "If memories could be shared like files, should they be admissible as evidence?"
  },
  {
    "kind": "debate",
    "category": "hypotheticals",
    "difficulty": "mind boggling",
    "question": "If you could guarantee world peace by banning one emotion, should you?"
  },
  {
    "kind": "debate",
    "category": "hypotheticals",
    "difficulty": "easy",
    "question": "If two identical copies of you existed, would either be the original?"
  },
  {
    "kind": "debate",
    "category": "hypotheticals",
    "difficulty": "2 braincells needed",
    "question": "If you could know the exact truth about any one event, should some truths remain unknown?"
  },
  {
    "kind": "debate",
    "category": "hypotheticals",
    "difficulty": "mind boggling",
    "question": "If a virtual world felt exactly like reality, would living there be wrong?"
  },
  {
    "kind": "debate",
    "category": "hypotheticals",
    "difficulty": "easy",
    "question": "If time travel existed, should changing history be illegal?"
  },
  {
    "kind": "debate",
    "category": "hypotheticals",
    "difficulty": "2 braincells needed",
    "question": "If immortality became possible, should it be available to everyone?"
  },
  {
    "kind": "debate",
    "category": "hypotheticals",
    "difficulty": "mind boggling",
    "question": "If society could eliminate all risk, would it be worth the loss of freedom?"
  },
  {
    "kind": "philosophy",
    "category": "existence",
    "difficulty": "easy",
    "question": "What makes you the same person you were five years ago?"
  },
  {
    "kind": "philosophy",
    "category": "existence",
    "difficulty": "2 braincells needed",
    "question": "Would your life have meaning if nobody remembered it?"
  },
  {
    "kind": "philosophy",
    "category": "existence",
    "difficulty": "mind boggling",
    "question": "Does a choice matter if it changes nothing?"
  },
  {
    "kind": "philosophy",
    "category": "existence",
    "difficulty": "easy",
    "question": "Can something be real if nobody can observe it?"
  },
  {
    "kind": "philosophy",
    "category": "existence",
    "difficulty": "2 braincells needed",
    "question": "If you replaced every part of a ship, is it still the same ship?"
  },
  {
    "kind": "philosophy",
    "category": "existence",
    "difficulty": "mind boggling",
    "question": "Could an exact digital copy of your mind be you?"
  },
  {
    "kind": "philosophy",
    "category": "existence",
    "difficulty": "easy",
    "question": "Is happiness a goal or a side effect?"
  },
  {
    "kind": "philosophy",
    "category": "existence",
    "difficulty": "2 braincells needed",
    "question": "Could you be certain you're not dreaming?"
  },
  {
    "kind": "philosophy",
    "category": "existence",
    "difficulty": "mind boggling",
    "question": "Does time pass, or do we move through it?"
  },
  {
    "kind": "philosophy",
    "category": "existence",
    "difficulty": "easy",
    "question": "Can a finite life have infinite meaning?"
  },
  {
    "kind": "philosophy",
    "category": "consciousness",
    "difficulty": "easy",
    "question": "What would count as proof that an AI is conscious?"
  },
  {
    "kind": "philosophy",
    "category": "consciousness",
    "difficulty": "2 braincells needed",
    "question": "Could two people ever experience exactly the same color?"
  },
  {
    "kind": "philosophy",
    "category": "consciousness",
    "difficulty": "mind boggling",
    "question": "If a robot behaves like a person, does it matter what it feels inside?"
  },
  {
    "kind": "philosophy",
    "category": "consciousness",
    "difficulty": "easy",
    "question": "Are emotions a type of intelligence?"
  },
  {
    "kind": "philosophy",
    "category": "consciousness",
    "difficulty": "2 braincells needed",
    "question": "Could consciousness exist without memory?"
  },
  {
    "kind": "philosophy",
    "category": "consciousness",
    "difficulty": "mind boggling",
    "question": "If your memories changed overnight, would you notice?"
  },
  {
    "kind": "philosophy",
    "category": "consciousness",
    "difficulty": "easy",
    "question": "Can a thought exist without language?"
  },
  {
    "kind": "philosophy",
    "category": "consciousness",
    "difficulty": "2 braincells needed",
    "question": "What makes a dream feel real while you're inside it?"
  },
  {
    "kind": "philosophy",
    "category": "consciousness",
    "difficulty": "mind boggling",
    "question": "Could a collective group have a single consciousness?"
  },
  {
    "kind": "philosophy",
    "category": "consciousness",
    "difficulty": "easy",
    "question": "Does understanding require experience?"
  },
  {
    "kind": "philosophy",
    "category": "physics",
    "difficulty": "easy",
    "question": "If the universe is infinite, does every possible event happen?"
  },
  {
    "kind": "philosophy",
    "category": "physics",
    "difficulty": "2 braincells needed",
    "question": "What would time mean in a universe where nothing changes?"
  },
  {
    "kind": "philosophy",
    "category": "physics",
    "difficulty": "mind boggling",
    "question": "If you traveled near light speed, why might your clock differ from Earth's?"
  },
  {
    "kind": "philosophy",
    "category": "physics",
    "difficulty": "easy",
    "question": "Does randomness make the universe less predictable or more interesting?"
  },
  {
    "kind": "philosophy",
    "category": "physics",
    "difficulty": "2 braincells needed",
    "question": "Could the universe have no beginning?"
  },
  {
    "kind": "philosophy",
    "category": "physics",
    "difficulty": "mind boggling",
    "question": "Would gravity feel different if you lived on a tiny planet?"
  },
  {
    "kind": "philosophy",
    "category": "physics",
    "difficulty": "easy",
    "question": "Why is the night sky dark if the universe contains so many stars?"
  },
  {
    "kind": "philosophy",
    "category": "physics",
    "difficulty": "2 braincells needed",
    "question": "What would observation mean at the quantum scale?"
  },
  {
    "kind": "philosophy",
    "category": "physics",
    "difficulty": "mind boggling",
    "question": "Could space exist without matter?"
  },
  {
    "kind": "philosophy",
    "category": "physics",
    "difficulty": "easy",
    "question": "If time had more than one dimension, how would choices work?"
  },
  {
    "kind": "philosophy",
    "category": "logic",
    "difficulty": "easy",
    "question": "Can two contradictory statements both be useful?"
  },
  {
    "kind": "philosophy",
    "category": "logic",
    "difficulty": "2 braincells needed",
    "question": "If you know that you know nothing, what do you know?"
  },
  {
    "kind": "philosophy",
    "category": "logic",
    "difficulty": "mind boggling",
    "question": "Is a perfect prediction also a cause of what happens?"
  },
  {
    "kind": "philosophy",
    "category": "logic",
    "difficulty": "easy",
    "question": "Can a rule have zero exceptions?"
  },
  {
    "kind": "philosophy",
    "category": "logic",
    "difficulty": "2 braincells needed",
    "question": "Is an unsolvable question still meaningful?"
  },
  {
    "kind": "philosophy",
    "category": "logic",
    "difficulty": "mind boggling",
    "question": "What is the difference between truth and proof?"
  },
  {
    "kind": "philosophy",
    "category": "logic",
    "difficulty": "easy",
    "question": "Can an infinite set be larger than another infinite set?"
  },
  {
    "kind": "philosophy",
    "category": "logic",
    "difficulty": "2 braincells needed",
    "question": "Is certainty possible without assumptions?"
  },
  {
    "kind": "philosophy",
    "category": "logic",
    "difficulty": "mind boggling",
    "question": "If everyone agrees on something false, does consensus change its truth?"
  },
  {
    "kind": "philosophy",
    "category": "logic",
    "difficulty": "easy",
    "question": "Can a paradox reveal a flaw in a question rather than in reality?"
  }
]
const KINDS = new Set(['debate', 'philosophy'])
const LEVELS = ["easy","2 braincells needed","mind boggling"]
const CATEGORIES = { debate: ["ethics","technology","society","science","gaming","hypotheticals"], philosophy: ["existence","consciousness","physics","logic"] }
function choose(kind, category, difficulty) {
  if (!KINDS.has(kind)) return null
  const matches = BANK.filter((p) => p.kind === kind && (!category || p.category === category) && (!difficulty || p.difficulty === difficulty))
  if (!matches.length) return null
  return matches[Math.floor(Math.random() * matches.length)]
}
function format(prompt) {
  const title = prompt.kind === 'debate' ? '⚖️ Debate topic' : '🧠 Philosophy question'
  return title + ' • ' + prompt.category + ' • ' + prompt.difficulty + '\n' + prompt.question
}
function parsePrefix(content) {
  const match = /^!(debate|philosophy)(?:\s+(.*))?$/i.exec(content.trim())
  if (!match) return null
  const kind = match[1].toLowerCase()
  const args = (match[2] || '').toLowerCase().trim()
  const level = LEVELS.find((v) => args.includes(v))
  const category = CATEGORIES[kind].find((v) => args.split(/\s+/).includes(v))
  if (args && !level && !category) return { kind, invalid: true }
  return { kind, category, difficulty: level }
}
async function handleMessage(message) {
  const parsed = parsePrefix(message.content || '')
  if (!parsed) return false
  const prompt = !parsed.invalid && choose(parsed.kind, parsed.category, parsed.difficulty)
  await message.reply({ content: prompt ? format(prompt) : 'Unknown category or difficulty. Try !' + parsed.kind + ' or use the slash command to select options.', allowedMentions: { parse: [], repliedUser: false } })
  return true
}
async function handleCommand(interaction) {
  const prompt = choose(interaction.commandName, interaction.options.getString('category'), interaction.options.getString('difficulty'))
  await interaction.reply({ content: prompt ? format(prompt) : 'No prompts match those filters.', allowedMentions: { parse: [] } })
}
module.exports = { BANK, CATEGORIES, LEVELS, choose, parsePrefix, handleMessage, handleCommand }
