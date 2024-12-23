import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  Colors,
} from 'discord.js';
import { Command } from './index';

const avatarCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Display a users avatar')
    .addUserOption((option) =>
      option
        .setName('target')
        .setRequired(false)
        .setDescription('User to target')
    ),
  async execute(interaction) {
    interaction = interaction as ChatInputCommandInteraction;
    var user = interaction.options.getUser('target', false);
    if (!user) {
      user = interaction.user;
    }

    const avatarUrl = user.displayAvatarURL({ size: 1024 });
    const avatarEmbed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({
          size: 1024,
        }),
      })
      .setImage(avatarUrl)
      .setTitle(`${user.username}'s Avatar`)
      .setColor(
        interaction.guild?.members.cache.get(user.id)?.displayHexColor ||
          Colors.Green
      );

    await interaction.reply({
      embeds: [avatarEmbed],
    });
  },
};

export default avatarCommand;
