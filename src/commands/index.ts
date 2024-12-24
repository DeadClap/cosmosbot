import {
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  AutocompleteInteraction,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js';

export interface Command {
  data:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | SlashCommandOptionsOnlyBuilder; // Support commands with or without subcommands
  execute: (
    interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction
  ) => Promise<void>; // Support slash and context menu interactions
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>; // Optional autocomplete handler
}
