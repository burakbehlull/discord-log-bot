import { EmbedBuilder, GuildMember } from 'discord.js'
import { messageSender } from '../helpers/index.js'

export default {
    name: 'Guild Member Add Event',
    func: (client:any)=>{
        const sender = new messageSender(client)

        client.on('guildMemberAdd', (member:GuildMember)=>{
            const footer = { text: member.user.displayName, iconURL: member.user.avatarURL()}
            const Embed:any= new EmbedBuilder(sender.embed({title: "Guild Add Log", footer}))
                .setDescription(`<@${member.user.id}> adlı kullanıcı, sunucuya giriş yaptı.`)
                .setThumbnail(member.guild.iconURL())
            sender.send(Embed)
        })
    }
    
}
