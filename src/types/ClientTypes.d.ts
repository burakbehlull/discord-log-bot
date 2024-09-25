import { ClientEvents } from "discord.js"

interface IEvent {
    name: keyof ClientEvents;
    once?: boolean;
    execute: (client: any, ...args: any) => Promise<void> | void | any;
}

export {
    IEvent
}