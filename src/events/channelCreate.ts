import { AuditLogEvent, EmbedBuilder, Events } from 'discord.js'
import { messageSender } from '../helpers/index.js'
import { IEvent } from 'ClientTypes.js'

const channelCreate : IEvent = {
    name: 'channelCreate',
    async execute(client, channel) {

        const sender = new messageSender(client)
        
        const user = await sender.info(channel, AuditLogEvent.ChannelCreate)
        const footer = { text: user.executor.displayName, iconURL: user.executor.avatarURL()}

        const Embed : any = new EmbedBuilder(sender.embed({title: "Channel Create Log", footer}))
            .setDescription(`<@${user.executorId}> adlı kullanıcı, **${channel.name}** (id: ${channel.id}) adlı kanalı sildi.`)
            .setThumbnail(channel.guild.iconURL())
        await sender.send(Embed, "1279715642005651466")

    },
}

export default channelCreate


