import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../interfaces/Command';
import { version } from '../../package.json';
import getGitBranch from '../utils/gitBranch';
import convertMsToCompoundedTime from '../utils/convertMsToCompoundedTime';
const botInfoCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Displays information about the bot.'),
  async execute(interaction) {
    const infoEmbed = new EmbedBuilder()
      .setAuthor({
        name: interaction.client.user.username,
        iconURL: interaction.client.user.displayAvatarURL({ size: 512 }),
      })
      .addFields(
        {
          name: 'Uptime',
          value: `${convertMsToCompoundedTime(interaction.client.uptime)}`,
          inline: true,
        },
        {
          name: 'Version',
          value: `${version} (${getGitBranch()})`,
          inline: true,
        },
        {
          name: 'Guilds',
          value: `${interaction.client.guilds.cache.size}`,
          inline: true,
        }
      );
    await interaction.reply({
      embeds: [infoEmbed],
      ephemeral: true,
    });
  },
};

export default botInfoCommand;
