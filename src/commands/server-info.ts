import { SlashCommandBuilder, EmbedBuilder, Colors } from 'discord.js';
import { Command } from './index';
import timeSince from '../utils/timeSince';

const serverInfoCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Displays information about the current guild.'),
  async execute(interaction) {
    const guild = interaction.guild;
    if (!guild) {
      // Handle case where the interaction is not in a guild
      await interaction.reply({
        content: 'This command can only be used in a guild.',
        ephemeral: true,
      });
      return;
    }
    const guildCreatedAt = guild.createdAt
    const serverInfoEmbed = new EmbedBuilder()
      .setTitle(`${guild.name} (${guild.id})`) // Guild name will always be defined
      .setColor(Colors.Blurple)
      .setThumbnail(guild.iconURL({
        size: 512
      }))
      .addFields(
        { name: 'Guild Owner', value: `${guild.members.cache.get(guild.ownerId)?.displayName} (${guild.ownerId})`, inline: true },
        { name: 'Members', value: `${guild.memberCount}`, inline: true},
        { name: 'Boost Level', value: `${guild.premiumTier} (${guild.premiumSubscriptionCount} boosts)`, inline: true},
        { name: "Guild Created", value: `${guildCreatedAt.getMonth()}/${guildCreatedAt.getDate()}/${guildCreatedAt.getFullYear()} ${guildCreatedAt.getHours()}:${guildCreatedAt.getMinutes()}:${guildCreatedAt.getSeconds()} (${timeSince(guildCreatedAt)})`}
      );

    await interaction.reply({
      embeds: [serverInfoEmbed],
      ephemeral: true, // `ephemeral` is passed directly here
    });
  },
};

export default serverInfoCommand;
