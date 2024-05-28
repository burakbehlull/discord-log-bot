import {Client, GatewayIntentBits,AuditLogEvent, NonThreadGuildBasedChannel, EmbedBuilder} from 'discord.js'
import dotenv from 'dotenv'
import {messageSender} from './helpers/index.js'

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
    const IEmbed = sender.embed({
        title: 'Burak Behlül',
        description: 'github/burakbehlull',
    })
    sender.send(IEmbed)
})

client.login(process.env.TOKEN)
.then(()=> console.log('Bot başlatıldı'))
.catch((err)=> console.log('error: ', err))