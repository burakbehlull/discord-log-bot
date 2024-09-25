import { AuditLogEvent, EmbedBuilder } from 'discord.js'
import { messageSender } from '../helpers/index.js'
import { IEvent } from 'ClientTypes.js'

const channelDelete : IEvent = {
    name: 'channelDelete',
    async execute(client, channel) {
        const sender = new messageSender(client)
    
        const user = await sender.info(channel, AuditLogEvent.ChannelDelete)
        const footer = { text: user.executor.displayName, iconURL: user.executor.avatarURL()}
        const Embed : any = new EmbedBuilder(sender.embed({title: "Channel Update Log", footer}))
                .setDescription(`<@${user.executorId}> adlı kullanıcı, <#${channel.name}> (id: ${channel.id}) adlı kanalı sildi.`)
        await sender.send(Embed, "1279715642005651466")
    },
}

export default channelDelete


