import { AuditLogEvent, EmbedBuilder, NonThreadGuildBasedChannel } from "discord.js";
import { EmbedTypes } from '@/types'
export class messageSender {
    client;
    constructor(client:any){
        this.client = client
    }

    embed({ title, color=0x0099FF,footer }:EmbedTypes){
        const guild = this.client

        const IFooter = footer ?? { text: guild.user.displayName, iconURL: guild.user.avatarURL()}

        const IEmbed: any= new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setTimestamp()
        .setFooter(IFooter)
        return IEmbed
    }
    
    send(embed:any, id:number | any){
        const guild = this.client
        const getId = id ?? process.env.logChannel

        const channelSender = guild.channels.cache.get(getId)
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