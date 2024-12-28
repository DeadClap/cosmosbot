import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';
import { Command } from '../interfaces/Command';

const rollDice = (
  dice: string
): { total: number; rolls: number[]; modifier: number } => {
  const diceRegex = /^(\d*)d(\d+)([+-]\d+)?$/;
  const match = dice.match(diceRegex);

  if (!match) {
    throw new Error(
      'Invalid dice format. Use NdM + X or NdM - X (e.g., 2d20+5).'
    );
  }

  const count = parseInt(match[1]) || 1; // Number of dice to roll (default is 1)
  const sides = parseInt(match[2]); // Number of sides on the dice
  const modifier = match[3] ? parseInt(match[3]) : 0; // Modifier (e.g., +5 or -3)

  if (count < 1 || sides < 2) {
    throw new Error('You must roll at least 1 die with at least 2 sides.');
  }

  const rolls = Array.from(
    { length: count },
    () => Math.floor(Math.random() * sides) + 1
  );
  const total = rolls.reduce((sum, roll) => sum + roll, 0) + modifier;

  return { total, rolls, modifier };
};

const rollCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll dice in the NdM + X format (e.g., 2d20+5).')
    .addStringOption((option) =>
      option
        .setName('dice')
        .setDescription('The dice to roll, like 1d6, 2d20+5, or 3d12-4.')
        .setRequired(true)
    ),

  async execute(interaction) {
    interaction = interaction as ChatInputCommandInteraction;
    const dice = interaction.options.getString('dice', true);

    try {
      const { total, rolls, modifier } = rollDice(dice);

      const embed = new EmbedBuilder()
        .setColor(0x3498db)
        .setTitle('🎲 Dice Roll')
        .addFields(
          { name: 'Input', value: dice, inline: true },
          { name: 'Rolls', value: rolls.join(', '), inline: true },
          {
            name: 'Modifier',
            value: `${modifier >= 0 ? '+' : ''}${modifier}`,
            inline: true,
          },
          { name: 'Total', value: `${total}`, inline: false }
        )
        .setFooter({ text: 'Roll your dice again with /roll!' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred.';
      await interaction.reply({
        content: `⚠️ ${errorMessage}`,
        ephemeral: true,
      });
    }
  },
};

export default rollCommand;
