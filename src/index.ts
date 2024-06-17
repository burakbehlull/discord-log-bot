import { AuditLogEvent, Client, EmbedBuilder, GatewayIntentBits } from 'discord.js'
import { fileURLToPath, pathToFileURL } from 'node:url'
import dotenv from 'dotenv'
import path from 'node:path'
import fs from 'fs'

dotenv.config()

const { BOT_ID } = process.env
import { messageSender } from './helpers/index.js'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const eventsPath = path.join(dirname, 'events')
const eventsFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

(async () => {
    for (const file of eventsFiles) {
        const filePath = path.join(eventsPath, file)
        const fileUrl = pathToFileURL(filePath).href
        const event = await import(fileUrl)
        console.log(`${event.default?.name} yüklendi..`)
        if(event.default?.func){
            event.default?.func(client)
        }
    }
})()

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

const sender = new messageSender(client)

client.login(process.env.TOKEN)
.then(()=> console.log('Bot başlatıldı'))
.catch((err)=> console.log('error: ', err))