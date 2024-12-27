import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { Command } from './index';
import Tag from '../models/Tag';

const tagCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('tag')
    .setDescription('Manage tags.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('create')
        .setDescription('Create a new tag.')
        .addStringOption((option) =>
          option
            .setName('name')
            .setDescription('The name of the tag.')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('content')
            .setDescription('The content of the tag.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('get')
        .setDescription('Retrieve a tag by name.')
        .addStringOption((option) =>
          option
            .setName('name')
            .setDescription('The name of the tag to retrieve.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('delete')
        .setDescription('Delete a tag by name.')
        .addStringOption((option) =>
          option
            .setName('name')
            .setDescription('The name of the tag to delete.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName('list').setDescription('List all available tags.')
    ),

  async execute(interaction) {
    interaction = interaction as ChatInputCommandInteraction;
    const subcommand = interaction.options.getSubcommand();
    const guildId = interaction.guild?.id;

    if (!guildId) {
      await interaction.reply({
        content: '❌ This command can only be used in a server.',
        ephemeral: true,
      });
      return;
    }

    switch (subcommand) {
      case 'create': {
        const name = interaction.options.getString('name', true).toLowerCase();
        const content = interaction.options.getString('content', true);

        try {
          await Tag.create({
            name,
            content,
            createdBy: interaction.user.id,
            guildId, // Associate tag with the guild
          });

          const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle('✅ Tag Created')
            .addFields(
              { name: 'Name', value: name, inline: true },
              { name: 'Content', value: content }
            )
            .setTimestamp();

          await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
          if (
            error instanceof Error &&
            error.name === 'SequelizeUniqueConstraintError'
          ) {
            await interaction.reply({
              content: `⚠️ A tag with the name \`${name}\` already exists in this server.`,
              ephemeral: true,
            });
          } else {
            await interaction.reply({
              content: `❌ Failed to create the tag.`,
              ephemeral: true,
            });
          }
        }
        break;
      }
      case 'get': {
        const name = interaction.options.getString('name', true).toLowerCase();

        const tag = await Tag.findOne({ where: { name, guildId } }); // Filter by guildId
        if (tag) {
          const createdBy = tag.dataValues.createdBy;
          const member = interaction.guild?.members.cache.get(createdBy);

          const embed = new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle(`📄 Tag: ${name}`)
            .setDescription(tag.dataValues.content)
            .setFooter({
              text: member
                ? `Created by: ${member.displayName}`
                : `Created by: Unknown Member`,
              iconURL: member?.displayAvatarURL() ?? undefined,
            })
            .setTimestamp();

          await interaction.reply({ embeds: [embed] });
        } else {
          await interaction.reply({
            content: `⚠️ Tag \`${name}\` not found in this server.`,
            ephemeral: true,
          });
        }
        break;
      }
      case 'delete': {
        const name = interaction.options.getString('name', true).toLowerCase();

        const tag = await Tag.findOne({ where: { name, guildId } }); // Filter by guildId
        if (!tag) {
          await interaction.reply({
            content: `⚠️ Tag \`${name}\` not found in this server.`,
            ephemeral: true,
          });
          return;
        }

        if (tag.dataValues.createdBy !== interaction.user.id) {
          await interaction.reply({
            content: `❌ You can only delete tags you created.`,
            ephemeral: true,
          });
          return;
        }

        await tag.destroy();

        const embed = new EmbedBuilder()
          .setColor(0xff0000)
          .setTitle('🗑️ Tag Deleted')
          .setDescription(`Tag \`${name}\` was successfully deleted.`)
          .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
        break;
      }
      case 'list': {
        const tags = await Tag.findAll({ where: { guildId } }); // Filter by guildId

        if (tags.length === 0) {
          await interaction.reply({
            content: '⚠️ No tags available in this server.',
            ephemeral: true,
          });
        } else {
          const tagList = tags
            .map((tag) => `\`${tag.dataValues.name}\``)
            .join(', ');

          const embed = new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle('📜 Available Tags')
            .setDescription(tagList)
            .setTimestamp();

          await interaction.reply({ embeds: [embed], ephemeral: true });
        }
        break;
      }
      default:
        await interaction.reply({
          content: '❌ Invalid subcommand.',
          ephemeral: true,
        });
        break;
    }
  },
};

export default tagCommand;
