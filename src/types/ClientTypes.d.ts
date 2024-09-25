import { ClientEvents } from "discord.js";

interface IEvent<K extends keyof ClientEvents> {
    name: keyof ClientEvents,
    once?: boolean,
    execute: (client: any, ...args: ClientEvents[K]) => Promise<void> | void | any;
}

export {
    IEvent
}