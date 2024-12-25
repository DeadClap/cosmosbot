import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Team,
  TeamMemberRole,
} from 'discord.js';
import { Command } from './index';
import logger from '../logger';

const restrictedTerms = ['client.token'];

const evalCommand: Command = {
  guilds: ['338919122454970378'],
  data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription(
      'Evaluate JavaScript code (restricted to application team admins).'
    )
    .addStringOption((option) =>
      option
        .setName('code')
        .setDescription('The code to evaluate.')
        .setRequired(true)
    ),

  async execute(interaction) {
    interaction = interaction as ChatInputCommandInteraction;

    // Fetch the application info
    const application = await interaction.client.application?.fetch();

    // Ensure the application is owned by a team
    const owner = application?.owner;
    if (!(owner instanceof Team)) {
      // Single-user-owned bot, deny access for non-owner
      if (owner?.id !== interaction.user.id) {
        await interaction.reply({
          content: '⚠️ This command is restricted to the bot owner.',
          ephemeral: true,
        });
        return;
      }
    } else {
      // Application is team-owned, check if the user is a team admin
      const isAdmin = () => {
        if (interaction.user.id === owner.ownerId) return true;
        if (
          owner.members.get(interaction.user.id) &&
          owner.members.get(interaction.user.id)?.role === TeamMemberRole.Admin
        )
          return true;
        if (
          owner.members.get(interaction.user.id) &&
          owner.members.get(interaction.user.id)?.role ===
            TeamMemberRole.Developer
        )
          return true;
        return false;
      };

      if (!isAdmin) {
        await interaction.reply({
          content:
            '⚠️ You must be an admin of the application team to use this command.',
          ephemeral: true,
        });
        return;
      }
    }

    // Get the code from the interaction
    const code = interaction.options.getString('code', true);

    // Check for restricted terms
    if (restrictedTerms.some((term) => code.includes(term))) {
      await interaction.reply({
        content: `⚠️ Access to restricted properties like \`client.token\` is not allowed.`,
        ephemeral: true,
      });
      return;
    }

    try {
      // Evaluate the code
      let result = eval(code);

      // Handle async results
      if (result instanceof Promise) {
        result = await result;
      }

      // Format the result
      const resultString =
        typeof result === 'string' ? result : require('util').inspect(result);
      const truncatedResult =
        resultString.length > 2000
          ? `${resultString.slice(0, 2000)}...`
          : resultString;

      await interaction.reply({
        content: `\`\`\`js\n${truncatedResult}\n\`\`\``,
        ephemeral: true,
      });
    } catch (error) {
      await interaction.reply({
        content: `⚠️ Error:\n\`\`\`js\n${error}\n\`\`\``,
        ephemeral: true,
      });
    }
  },
};

export default evalCommand;
