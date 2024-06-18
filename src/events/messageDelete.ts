import { EmbedBuilder, Message, Client } from 'discord.js'
import { messageSender } from '../helpers/index.js'

export default {
    name: 'Message Delete Event',
    func: (client:Client)=>{
        const sender = new messageSender(client)
        client.on('messageDelete', async (message:Message)=>{
            if(message.author.bot) return
            const footer = { text: message.author.displayName, iconURL: message.author.avatarURL()}
            const Embed:any= new EmbedBuilder(sender.embed({title: "Message Log", footer}))
                .setDescription(`<@${message.author.id}> adlı kullanıcı, <#${message.channelId}> kanalında **${message.content}** adlı mesajı sildi`)
                .setThumbnail(message.guild.iconURL())
            sender.send(Embed, "1245026894165053590")
        })
    }
    
}
