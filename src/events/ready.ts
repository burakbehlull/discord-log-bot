import {PresenceData} from 'discord.js'

export function ready(client: any | undefined, activities:PresenceData){
    if(!client) return
    client.on('ready', ()=> {
        client.user.setPresence(activities)
    })
}
