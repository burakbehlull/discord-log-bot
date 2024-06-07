import { ActivityType } from 'discord.js'

export default {
    name: 'Ready Event',
    func: (client: any | undefined) =>{
        if(!client) return
        client.on('ready', ()=> {
            client.user.setPresence({
                activities: [
                    {
                        name: 'Star Wars: Revenge of The Sith', 
                        type: ActivityType.Watching
                    }
                ],
                status: 'dnd',
                shardId: 0
            })
        })
    }
}
