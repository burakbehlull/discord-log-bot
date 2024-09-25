import { AuditLogEvent, EmbedBuilder } from "discord.js";
import { EmbedTypes } from '../types/index.js'
export class messageSender {
    client;
    constructor(client:any){
        this.client = client
    }

    embed({ title, color=0x0099FF,footer }:EmbedTypes, interaction?:any){
        const guild = interaction ?? this.client

        const IFooter = footer ?? { text: guild.user.displayName, iconURL: guild.user.avatarURL()}
        const IEmbed: any= new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setTimestamp()
        .setFooter(IFooter)
        return IEmbed
    }
    async send(embed:any, id?:number | any){
        try {
            const guild = this.client
            const getId = id ?? process.env.logChannel

            const channelSender = guild.channels.cache.get(getId)
            await channelSender.send({ embeds: [embed] })
        } catch (error) {
            console.log('Hata: ', error.message)
        }
    }
    async sendAny(text:any, id:number | any){
        try {
            const guild = this.client
            const getId = id ?? process.env.logChannel
    
            const channelSender = guild.channels.cache.get(getId)
            await channelSender.send(text)
        } catch (error) {
            console.log('Hata: ', error.message)
            
        }
    }

    async info(child:any, type:AuditLogEvent | any){
        try {
            const logs = await child.guild.fetchAuditLogs({
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