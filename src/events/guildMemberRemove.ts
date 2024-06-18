import { EmbedBuilder, GuildMember } from 'discord.js'
import { messageSender } from '../helpers/index.js'

export default {
    name: 'Guild Member Remove Event',
    func: (client:any)=>{
        const sender = new messageSender(client)

        client.on('guildMemberRemove', (member:GuildMember)=>{
            const footer = { text: member.user.displayName, iconURL: member.user.avatarURL()}
            const Embed:any= new EmbedBuilder(sender.embed({title: "Guild Add Log", footer}))
                .setDescription(`<@${member.user.id}> adlı kullanıcı, sunucudan çıkış yaptı.`)
                .setThumbnail(member.guild.iconURL())
            sender.send(Embed, "1245026894165053590")
        })
        
    }
    
}
