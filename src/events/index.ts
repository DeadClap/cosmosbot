import { Client } from "discord.js";

export interface Event {
    name: string;
    once?: boolean;
    execute: (...args: any[]) => void;
}

export function registerEvents(client: Client, events: Event[]) {
    for (const event of events) {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args))
        }
    }
}