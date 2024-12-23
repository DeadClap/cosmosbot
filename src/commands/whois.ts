import { SlashCommandBuilder } from 'discord.js';
import { Command } from './index';
import userInfoCommand from './user-info';

const whoIsCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('whois')
    .setDescription('Displays information about the targeted user or yourself.')
    .addUserOption((option) =>
      option
        .setDescription('User to target')
        .setName('target')
        .setRequired(false)
    ) as SlashCommandBuilder,
  execute: userInfoCommand.execute,
};

export default whoIsCommand;
