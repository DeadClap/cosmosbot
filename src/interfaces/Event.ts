import { Client, ClientEvents } from 'discord.js';

export interface Event<K extends keyof ClientEvents = keyof ClientEvents> {
  name: string;
  once?: boolean;
  execute: (...args: ClientEvents[K]) => void | Promise<void>;
}

export function registerEvents<K extends keyof ClientEvents>(
  client: Client,
  events: Event<K>[]
) {
  for (const event of events) {
    if (event.once) {
      client.once(event.name, (...args: ClientEvents[K]) =>
        event.execute(...args)
      );
    } else {
      client.on(event.name, (...args: ClientEvents[K]) =>
        event.execute(...args)
      );
    }
  }
}
