import { AuditLogEvent, EmbedBuilder } from 'discord.js'
import { messageSender } from '../helpers/index.js'

export default {
    name: 'Role Update Event',
    func: (client:any)=>{
        const sender = new messageSender(client)

        client.on('roleUpdate', async (role:any)=>{
            const user:any = await sender.info(role, AuditLogEvent.RoleCreate)
            const footer = { text: user.executor.displayName, iconURL: user.executor.avatarURL()}
            const IEmbed = new EmbedBuilder(sender.embed({title: 'Role Log', footer:footer}))
                .setDescription(`<@${user.executorId}> kullanıcı, <@!${role.name}> (${role.id}) adlı rolün üzerinde değişiklik yaptı`)
            await sender.send(IEmbed, '1245026894165053590')
        })  
        
        
    }
    
}
