import {PresenceData, ActivityType} from 'discord.js'

export default {
    name: 'hazır',
    func: (client: any | undefined) =>{
        if(!client) return
        client.on('ready', ()=> {
            client.user.setPresence({
                activities: [
                    {
                        name: 'Star Wars Clon Savaşları', 
                        type: ActivityType.Watching
                    }
                ],
                status: 'dnd',
                shardId: 0
            })
        })
    }
}
