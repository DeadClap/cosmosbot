import {
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  SlashCommandOptionsOnlyBuilder,
  AutocompleteInteraction,
  GuildResolvable,
} from 'discord.js';

/**
 * Represents a command for a Discord bot.
 */
export interface Command {
  /**
   * The metadata and structure of the command.
   * This can define a full command, a command with only subcommands, or a command with only options.
   *
   * @type SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder
   */
  data:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | SlashCommandOptionsOnlyBuilder;

  /**
   * Executes the logic for this command when invoked by a user.
   *
   * @param interaction - The interaction that triggered the command.
   * This can be either a `ChatInputCommandInteraction` (slash command) or a `ContextMenuCommandInteraction`.
   *
   * @returns A Promise that resolves when the command logic has been executed.
   */
  execute: (
    interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction
  ) => Promise<void>;

  /**
   * Handles autocomplete interactions for this command (if applicable).
   *
   * @param interaction - The autocomplete interaction, containing the focused option and other context.
   *
   * @returns A Promise that resolves after processing the autocomplete interaction.
   */
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;

  /**
   * Specifies the guild(s) where the command should be registered.
   * If omitted, the command will be registered globally.
   *
   * @type GuildResolvable | GuildResolvable[]
   */
  guilds?: GuildResolvable | GuildResolvable[];
}
