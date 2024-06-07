import { Client, GatewayIntentBits, AuditLogEvent, 
    NonThreadGuildBasedChannel, EmbedBuilder } from 'discord.js'
    
import { fileURLToPath, pathToFileURL } from 'node:url'
import dotenv from 'dotenv'
import path from 'node:path'
import fs from 'fs'

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
    const Embed :any = new EmbedBuilder(sender.embed({title: "Channel Log", footer}))
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
.then(()=> {
    console.log('Bot başlatıldı')

})
.catch((err)=> console.log('error: ', err))