import axios from 'axios';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../interfaces/Command';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const dogCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('Fetches a random dog picture with a fun fact.'),

  async execute(interaction) {
    try {
      // Fetch a random dog picture from The Dog API
      const dogImageResponse = await axios.get(
        'https://api.thedogapi.com/v1/images/search',
        {
          headers: {
            'x-api-key': process.env.DOG_API_KEY!, // Pass API key in headers
          },
        }
      );

      const dogImageData = dogImageResponse.data as { url: string }[];

      if (!dogImageData || !dogImageData[0]?.url) {
        await interaction.reply({
          content:
            '⚠️ Could not fetch a dog picture at the moment. Please try again later.',
          ephemeral: true,
        });
        return;
      }

      const dogImageUrl = dogImageData[0].url;

      // Fetch a random dog fact
      const dogFactResponse = await axios.get(
        'https://dog-api.kinduff.com/api/facts'
      );
      const dogFactData = dogFactResponse.data as { facts: string[] };

      if (!dogFactData || !dogFactData.facts?.[0]) {
        await interaction.reply({
          content:
            '⚠️ Could not fetch a dog fact at the moment. Please try again later.',
          ephemeral: true,
        });
        return;
      }

      const dogFact = dogFactData.facts[0];

      // Create the embed
      const embed = new EmbedBuilder()
        .setColor(0x1f8b4c) // Green color
        .setTitle('🐶 Random Dog')
        .setDescription(`**Fun Fact:** ${dogFact}`)
        .setImage(dogImageUrl) // Embed the dog picture
        .setFooter({ text: 'Powered by The Dog API & Dog Facts API' })
        .setTimestamp();

      // Reply with the embed
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching dog picture or fact:', error);

      await interaction.reply({
        content:
          '⚠️ An error occurred while fetching a dog picture or fact. Please try again later.',
        ephemeral: true,
      });
    }
  },
};

export default dogCommand;
