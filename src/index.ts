import { Client, GatewayIntentBits } from 'discord.js'
import 'dotenv/config.js'
import { Base } from './helpers/index.js'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ]
})

const base = new Base(client)
base.loadEvents()
base.login()