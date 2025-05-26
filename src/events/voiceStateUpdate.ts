import { EmbedBuilder } from 'discord.js'
import { messageSender } from '../helpers/index.js'

export default {
    name: 'Voice State Update Event',
    func: (client:any)=>{
        const sender = new messageSender(client)
        client.on('voiceStateUpdate', async (oldState:any, newState:any)=> {
            if (!oldState.channelId && newState.channelId) {
                const channel = newState.guild.channels.cache.get(newState.channelId)
                
                if (channel) {
                    const IEmbed = new EmbedBuilder(sender.embed({title: 'Voice Log'}))
                        .setDescription(`<@${newState.member.user.id}> adlı kullanıcı <#${newState.channelId}> kanalına girdi.`)
                    await sender.send(IEmbed)
                    
                }
            }
            if (oldState.channelId && !newState.channelId) {
                const channel = oldState.guild.channels.cache.get(oldState.channelId)
                if (channel) {
                    const IEmbed = new EmbedBuilder(sender.embed({title: 'Voice Log'}))
                        .setDescription(`<@${oldState.member.user.id}> adlı kullanıcı <#${oldState.channelId}> kanalından çıktı.`)
                    await sender.send(IEmbed)
                }
            }
        })
    }
    
}
