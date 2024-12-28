import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';
import { Command } from '../interfaces/Command';

const responses = [
  'It is certain.',
  'Without a doubt.',
  'You may rely on it.',
  'Yes, definitely.',
  'As I see it, yes.',
  'Most likely.',
  'Outlook good.',
  'Yes.',
  'Signs point to yes.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  'Cannot predict now.',
  'Concentrate and ask again.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Outlook not so good.',
  'Very doubtful.',
];

const eightBallCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8-ball a yes or no question.')
    .addStringOption((option) =>
      option
        .setName('question')
        .setDescription('The question you want to ask.')
        .setRequired(true)
    ),

  async execute(interaction) {
    interaction = interaction as ChatInputCommandInteraction;
    const question = interaction.options.getString('question', true);

    // Get a random response from the array
    const response = responses[Math.floor(Math.random() * responses.length)];

    // Create the embed
    const embed = new EmbedBuilder()
      .setColor(0x3498db) // Blue color
      .setTitle('🎱 The Magic 8-Ball Speaks')
      .addFields(
        { name: 'Your Question:', value: question },
        { name: '8-Ball Says:', value: response }
      )
      .setFooter({
        text: 'Ask wisely!',
        iconURL:
          'https://upload.wikimedia.org/wikipedia/commons/e/eb/Magic_eight_ball.png',
      })
      .setTimestamp();

    // Reply with the embed
    await interaction.reply({ embeds: [embed] });
  },
};

export default eightBallCommand;
