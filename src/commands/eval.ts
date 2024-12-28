import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command } from '../interfaces/Command';
import { isAdmin } from '../utils/isAdmin';

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

    // Check if the user is an admin
    const isUserAdmin = await isAdmin(interaction);
    if (!isUserAdmin) {
      await interaction.reply({
        content:
          '⚠️ You must be an admin of the application team to use this command.',
        ephemeral: true,
      });
      return;
    }

    // Get the code from the interaction
    const code = interaction.options.getString('code', true);

    // Check for restricted terms
    if (restrictedTerms.some((term) => code.includes(term))) {
      await interaction.reply({
        content: `⚠️ Access to restricted properties is not allowed.`,
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
