import { AuditLogEvent, EmbedBuilder, NonThreadGuildBasedChannel } from 'discord.js'
import { messageSender } from '../helpers/index'

export default {
    name: 'Message Create Event',
    func: (client:any)=>{
        const sender = new messageSender(client)
        client.on('messageCreate', async (message:any)=>{
            if(message.author.bot) return
            const user = await sender.info(message, null)
            const footer = { text: user.executor.displayName, iconURL: user.executor.avatarURL()}
            const Embed:any= new EmbedBuilder(sender.embed({title: "Message Log", footer}))
                .setDescription(`<@${user.executorId}> adlı kullanıcı, <#${message.channelId}> kanalına **${message.content}** adlı mesaj yolladı.`)
                .setThumbnail(message.guild.iconURL())
            sender.send(Embed, "1245026894165053590")
        })
        
    }
    
}
