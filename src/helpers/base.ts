import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import fs from 'fs'

export class Base {
    client;
    constructor(client:any){
        this.client = client
    }
    async loadEvents(){
        const filename = fileURLToPath(import.meta.url)
        const dirname = path.dirname(filename)
        const eventsPath = path.join(dirname, '..', 'events')
        const eventsFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
        
        for (const file of eventsFiles) {
            const filePath = path.join(eventsPath, file)
            const fileUrl = pathToFileURL(filePath).href
            const reqFile = await import(fileUrl)
            const event = reqFile.default

            console.log(event.name+' yüklendi')
            if(event.once){
                this.client.once(event.name, (...args:any) => event.execute(...args))
            } else {
                this.client.on(event.name, (...args:any) => event.execute(this.client, ...args))
            }

        }
        console.log('yüklendi')
        
    }
    login(){
        this.client.login(process.env.TOKEN)
        .then(()=> console.log('Bot başlatıldı'))
        .catch((err:any)=> console.log('Hata: ', err.message))
    }
}