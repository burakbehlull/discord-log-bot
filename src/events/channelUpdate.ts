import { AuditLogEvent, EmbedBuilder, Events } from 'discord.js'
import { messageSender } from '../helpers/index.js'
import { IEvent } from 'ClientTypes.js'

const channelUpdate : IEvent = {
    name: 'channelUpdate',
    async execute(client, oldChannel, newChannel) {
        
        const sender = new messageSender(client)

        const user = await sender.info(newChannel, AuditLogEvent.ChannelUpdate)
        const footer = { text: user.executor.displayName, iconURL: user.executor.avatarURL()}
        
        const Embed : any = new EmbedBuilder(sender.embed({title: "Channel Update Log", footer}))
            .setDescription(`<@${user.executorId}> adlı kullanıcı, <#${oldChannel.id}> (id: ${oldChannel.id}) adlı kanalı güncelledi.`)
        await sender.send(Embed, "1279715642005651466")

    
    },
}

export default channelUpdate


