import {Client, GatewayIntentBits} from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

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

client.login(process.env.TOKEN)
.then(()=> console.log('Bot başlatıldı'))
.catch((err)=> console.log('error: ', err))