import { EmbedBuilder, Client } from 'discord.js'
import { messageSender } from '../helpers/index.js'

export default {
    name: 'Message Update Event',
    func: (client:Client)=>{
        const sender = new messageSender(client)
        client.on('messageUpdate', async (oldMsg:any, newMsg:any)=>{
            if(newMsg.author.bot) return
            const footer = { text: message.author.displayName, iconURL: message.author.avatarURL()}
            const Embed:any= new EmbedBuilder(sender.embed({title: "Message Log", footer}))
                .setDescription(`<@${oldMsg.author.id}> adlı kullanıcı, <#${newMsg.channelId}> kanalına attığı **${oldMsg}** mesajını **${newMsg}** diye değiştirdi.`)
                .setThumbnail(newMsg.guild.iconURL())
            sender.send(Embed, "1245026894165053590")
        }) 
    }
    
}
