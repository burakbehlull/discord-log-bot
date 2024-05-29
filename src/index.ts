import { Client, GatewayIntentBits, AuditLogEvent, 
    NonThreadGuildBasedChannel, EmbedBuilder } from 'discord.js'
import dotenv from 'dotenv'
import {messageSender} from '@/helpers'
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

const sender = new messageSender(client)

client.on('channelCreate', async (channel:NonThreadGuildBasedChannel)=> {
    const x:any= new EmbedBuilder()
        .setDescription('ümit başardım kanka')
    await sender.info(channel, AuditLogEvent.ChannelCreate)
    sender.send(x, "1245026894165053590")
})

client.login(process.env.TOKEN)
.then(()=> console.log('Bot başlatıldı'))
.catch((err)=> console.log('error: ', err))