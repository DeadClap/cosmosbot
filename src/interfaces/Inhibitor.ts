import { ChatInputCommandInteraction, Client } from 'discord.js';

export interface Inhibitor {
  /**
   * Executes the inhibitor logic.
   * @param interaction The interaction that triggered the command.
   * @param client The Discord client instance.
   * @returns `true` if the command should be blocked; `false` otherwise.
   */
  execute: (
    interaction: ChatInputCommandInteraction,
    client: Client
  ) => Promise<boolean>;
}
