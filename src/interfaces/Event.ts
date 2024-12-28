import { Client, ClientEvents } from 'discord.js';

/**
 * Represents an event for the Discord client.
 *
 * @template K - The name of the event, constrained to the keys of `ClientEvents`.
 */
export interface Event<K extends keyof ClientEvents = keyof ClientEvents> {
  /**
   * The name of the event (e.g., "ready", "messageCreate").
   */
  name: K;

  /**
   * Whether the event should be triggered only once.
   * If `true`, the listener is removed after the first execution.
   * Default: `false`.
   */
  once?: boolean;

  /**
   * The logic to execute when the event is triggered.
   *
   * @param args - The arguments provided by the Discord.js event, specific to the event name.
   * For example:
   *   - For the "ready" event, there are no arguments.
   *   - For the "messageCreate" event, the first argument is a `Message` object.
   *
   * @returns A `void` or `Promise<void>` indicating whether the operation is synchronous or asynchronous.
   */
  execute: (...args: ClientEvents[K]) => void | Promise<void>;
}

/**
 * Registers an array of events for the Discord client.
 *
 * @template K - The name of the event, constrained to the keys of `ClientEvents`.
 *
 * @param client - The Discord.js client instance.
 * @param events - An array of event objects that implement the `Event` interface.
 */
export function registerEvents<K extends keyof ClientEvents>(
  client: Client,
  events: Event<K>[]
) {
  for (const event of events) {
    if (event.once) {
      /**
       * If the event is marked as `once`, it will be triggered only once,
       * then automatically removed from the client.
       */
      client.once(event.name, (...args: ClientEvents[K]) =>
        event.execute(...args)
      );
    } else {
      /**
       * If the event is not marked as `once`, it will be triggered
       * every time the event occurs.
       */
      client.on(event.name, (...args: ClientEvents[K]) =>
        event.execute(...args)
      );
    }
  }
}
