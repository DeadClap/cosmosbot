import axios from 'axios';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../interfaces/Command';
import dotenv from 'dotenv';

dotenv.config();

const catCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Fetches a random cat picture with a fun fact.'),

  async execute(interaction) {
    try {
      // Fetch a random cat picture
      const { data: catImageData } = await axios.get(
        'https://api.thecatapi.com/v1/images/search',
        {
          headers: {
            'x-api-key': process.env.CAT_API_KEY!,
          },
        }
      );
      const { data: catFactData } = await axios.get(
        'https://meowfacts.herokuapp.com/'
      );

      if (!catImageData || !catImageData[0]?.url) {
        await interaction.reply({
          content:
            '⚠️ Could not fetch a cat picture at the moment. Please try again later.',
          ephemeral: true,
        });
        return;
      }

      if (!catFactData || !catFactData.data?.[0]) {
        await interaction.reply({
          content:
            '⚠️ Could not fetch a cat fact at the moment. Please try again later.',
          ephemeral: true,
        });
        return;
      }

      const catImageUrl = catImageData[0].url;
      const catFact = catFactData.data[0];

      const embed = new EmbedBuilder()
        .setColor(0x3498db)
        .setTitle('🐱 Random Cat')
        .setDescription(`**Fun Fact:** ${catFact}`)
        .setImage(catImageUrl)
        .setFooter({ text: 'Powered by The Cat API & Meow Facts' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching cat data:', error);
      await interaction.reply({
        content:
          '⚠️ An error occurred while fetching a cat picture or fact. Please try again later.',
        ephemeral: true,
      });
    }
  },
};

export default catCommand;
