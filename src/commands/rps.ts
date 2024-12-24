import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';
import { Command } from './index';

const choices = ['rock', 'paper', 'scissors'];

const rpsCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Play Rock, Paper, Scissors!')
    .addStringOption((option) =>
      option
        .setName('choice')
        .setDescription('Your choice: rock, paper, or scissors')
        .setRequired(true)
        .addChoices(
          { name: 'Rock', value: 'rock' },
          { name: 'Paper', value: 'paper' },
          { name: 'Scissors', value: 'scissors' }
        )
    ),

  async execute(interaction) {
    interaction = interaction as ChatInputCommandInteraction;
    const userChoice = interaction.options.getString('choice', true);
    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    // Determine the winner
    let result: string;
    if (userChoice === botChoice) {
      result = "It's a tie!";
    } else if (
      (userChoice === 'rock' && botChoice === 'scissors') ||
      (userChoice === 'paper' && botChoice === 'rock') ||
      (userChoice === 'scissors' && botChoice === 'paper')
    ) {
      result = 'You win! 🎉';
    } else {
      result = 'You lose! 😢';
    }

    // Map emojis for better visuals
    const emojiMap: Record<string, string> = {
      rock: '🪨',
      paper: '📄',
      scissors: '✂️',
    };

    // Create the embed
    const embed = new EmbedBuilder()
      .setColor(
        result === 'You win! 🎉'
          ? 0x00ff00
          : result === 'You lose! 😢'
            ? 0xff0000
            : 0xffff00
      )
      .setTitle('Rock, Paper, Scissors!')
      .addFields(
        {
          name: 'Your Choice',
          value: `${emojiMap[userChoice]} (${userChoice})`,
          inline: true,
        },
        {
          name: "Bot's Choice",
          value: `${emojiMap[botChoice]} (${botChoice})`,
          inline: true,
        },
        { name: 'Result', value: result, inline: false }
      )
      .setFooter({ text: 'Play again with /rps!' })
      .setTimestamp();

    // Send the embed
    await interaction.reply({ embeds: [embed] });
  },
};

export default rpsCommand;
