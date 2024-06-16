import { AuditLogEvent, EmbedBuilder } from 'discord.js'
import { messageSender } from '../helpers/index.js'

export default {
    name: 'Message Create Event',
    func: (client:any)=>{
        const sender = new messageSender(client)
        client.on('messageUpdate', async (oldMsg:any, newMsg:any)=>{
            if(newMsg.author.bot) return
            const user = await sender.info(newMsg, AuditLogEvent.MessageDelete)
            const footer = { text: user.executor.displayName, iconURL: user.executor.avatarURL()}
            const Embed:any= new EmbedBuilder(sender.embed({title: "Message Log", footer}))
                .setDescription(`<@${user.executorId}> adlı kullanıcı, <#${newMsg.channelId}> kanalına attığı **${oldMsg}** mesajını **${newMsg}** diye değiştirdi.`)
                .setThumbnail(newMsg.guild.iconURL())
            sender.send(Embed, "1245026894165053590")
        }) 
    }
    
}
