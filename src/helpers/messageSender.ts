import { AuditLogEvent, EmbedBuilder, NonThreadGuildBasedChannel } from "discord.js";
import { EmbedTypes } from '../types/index.js'
export class messageSender {
    client;
    constructor(client:any){
        this.client = client
    }

    embed({ color=0x0099FF, title, description,footer }:EmbedTypes){
        const guild = this.client

        const IFooter = footer ?? { text: guild.user.displayName, iconURL: guild.user.avatarURL()}

        const IEmbed= new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp()
        .setFooter(IFooter)
        return IEmbed
    }
    
    send(embed:any){
        const guild = this.client

        const channelSender = guild.channels.cache.get('1245026894165053590')
        channelSender.send({ embeds: [embed] })
    }
    async info(channel:NonThreadGuildBasedChannel, type:AuditLogEvent){
        try {
            const logs = await channel.guild.fetchAuditLogs({
                limit:1,
                type: type
            })
            const log = logs.entries.first()
            return log
        } catch (err) {
            console.log(err)
        }
    }
}