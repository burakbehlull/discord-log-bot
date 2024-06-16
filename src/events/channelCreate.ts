import { AuditLogEvent, EmbedBuilder, NonThreadGuildBasedChannel } from 'discord.js'
import { messageSender } from '../helpers/index'

export default {
    name: 'Channel Create Event',
    func: (client:any)=>{
        const sender = new messageSender(client)
        client.on('channelDelete', async (channel:NonThreadGuildBasedChannel)=> {
            const user = await sender.info(channel, AuditLogEvent.ChannelDelete)
            const footer = { text: user.executor.displayName, iconURL: user.executor.avatarURL()}
            const Embed :any = new EmbedBuilder(sender.embed({title: "Channel Log", footer}))
                .setDescription(`<@${user.executorId}> adlı kullanıcı, **${channel.name}** (id: ${channel.id}) adlı kanalı sildi.`)
                .setThumbnail(channel.guild.iconURL())
            sender.send(Embed, "1245026894165053590")
        })
    }
    
}
