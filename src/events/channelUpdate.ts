import { AuditLogEvent, EmbedBuilder, NonThreadGuildBasedChannel } from 'discord.js'
import { messageSender } from '../helpers/index.js'

export default {
    name: 'Channel Update Event',
    func: (client:any)=>{
        const sender = new messageSender(client)
        client.on('channelUpdate', async (channel:NonThreadGuildBasedChannel)=> {
            const user = await sender.info(channel, AuditLogEvent.ChannelUpdate)
            const footer = { text: user.executor.displayName, iconURL: user.executor.avatarURL()}
            const Embed :any= new EmbedBuilder(sender.embed({title: "Channel Log", footer}))
                .setDescription(`<@${user.executorId}> adlı kullanıcı, <#${channel.id}> (id: ${channel.id}) adlı kanalı güncelledi.`)
                .setThumbnail(channel.guild.iconURL())
            sender.send(Embed)
        })
    }
    
}
