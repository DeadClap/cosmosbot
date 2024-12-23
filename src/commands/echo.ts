import { SlashCommandBuilder } from 'discord.js';
import { Command } from './index';

const EchoCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input.')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('The message to echo.')
        .setRequired(true)
    ) as SlashCommandBuilder,
  async execute(interaction) {
    const message = interaction.options.getString('message', true);
    await interaction.reply(`You said: ${message}.`);
  },
};

export default EchoCommand;
