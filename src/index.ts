import { Client, GatewayIntentBits, AuditLogEvent, 
    NonThreadGuildBasedChannel, EmbedBuilder, 
    ActivityType} from 'discord.js'
import dotenv from 'dotenv'
import {messageSender} from './helpers/index.js'
import {ready} from './events/index.js'
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

ready(client, {
    activities: [
        {
            name: 'Star Wars Clon Savaşları', 
            type: ActivityType.Watching
        }
    ],
    status: 'dnd',
    shardId: 0
})

client.on('channelCreate', async (channel:NonThreadGuildBasedChannel)=> {
    const user = await sender.info(channel, AuditLogEvent.ChannelCreate)
    const footer = { text: user.executor.displayName, iconURL: user.executor.avatarURL()}
    const Embed:any= new EmbedBuilder(sender.embed({title: "Channel Log", footer}))
        .setDescription(`<@${user.executorId}> adlı kullanıcı <#${channel.id}> kanalını oluşturdu.`)
        .setThumbnail(channel.guild.iconURL())
    sender.send(Embed, "1245026894165053590")
})

client.on('channelDelete', async (channel:NonThreadGuildBasedChannel)=> {
    const user = await sender.info(channel, AuditLogEvent.ChannelDelete)
    const footer = { text: user.executor.displayName, iconURL: user.executor.avatarURL()}
    const Embed :any= new EmbedBuilder(sender.embed({title: "Channel Log", footer}))
        .setDescription(`<@${user.executorId}> adlı kullanıcı, **${channel.name}** (id: ${channel.id}) adlı kanalı sildi.`)
        .setThumbnail(channel.guild.iconURL())
    sender.send(Embed, "1245026894165053590")
})

client.on('channelUpdate', async (channel:NonThreadGuildBasedChannel)=> {
    const user = await sender.info(channel, AuditLogEvent.ChannelUpdate)
    const footer = { text: user.executor.displayName, iconURL: user.executor.avatarURL()}
    const Embed :any= new EmbedBuilder(sender.embed({title: "Channel Log", footer}))
        .setDescription(`<@${user.executorId}> adlı kullanıcı, <#${channel.id}> (id: ${channel.id}) adlı kanalı güncelledi.`)
        .setThumbnail(channel.guild.iconURL())
    sender.send(Embed, "1245026894165053590")
})

client.login(process.env.TOKEN)
.then(()=> console.log('Bot başlatıldı'))
.catch((err)=> console.log('error: ', err))