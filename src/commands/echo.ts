import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command } from '../interfaces/Command';

const EchoCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input.')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('The message to echo.')
        .setRequired(true)
    ),
  async execute(interaction) {
    interaction = interaction as ChatInputCommandInteraction;
    const message = interaction.options.getString('message', true);
    await interaction.reply(`You said: ${message}.`);
  },
};

export default EchoCommand;
