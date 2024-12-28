import { readdirSync } from 'fs';
import path from 'path';
import { Client } from 'discord.js';
import { Event, registerEvents } from './interfaces/Event';

export function loadEvents(client: Client) {
  const eventsPath = path.join(__dirname, 'events');
  const eventFiles = readdirSync(eventsPath).filter(
    (file) => file.endsWith('.ts') || file.endsWith('.js')
  );

  const events: Event[] = [];
  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file)).default;
    if (event && event.name) {
      events.push(event);
    }
  }

  registerEvents(client, events);
}
