import { Event } from './index';
import {
  ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  Interaction,
} from 'discord.js';
import { Command } from '../commands';
import logger from '../logger';

let commands: Command[] = [];

export function setCommands(loadedCommands: Command[]) {
  commands = loadedCommands;
}

const commandHandler: Event<'interactionCreate'> = {
  name: 'interactionCreate',
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const command = commands.find(
      (cmd) => cmd.data.name === interaction.commandName
    );
    if (!command) return;

    try {
      await command.execute(interaction as ChatInputCommandInteraction);
    } catch (error) {
      const locDate = new Date();
      const locator = `${interaction.commandName}-${locDate.getMonth()}${locDate.getDate()}${locDate.getFullYear()}${locDate.getHours()}${locDate.getMinutes()}${locDate.getSeconds()}`;
      logger.warn(
        `#${locator} Error executing command: "${interaction.commandName}"`,
        error
      );
      // logger.warn(interaction.toJSON())
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.client.user.username,
              iconURL: interaction.client.user.displayAvatarURL(),
            })
            .setColor(Colors.Red)
            .setTitle(`There was an error executing the command.`)
            .setDescription(
              `This has been logged to the console, please ask the owner to investigate. Please give them this locator number to assist in finding the error.`
            )
            .addFields({ name: `Locator Number:`, value: `#${locator}` }),
        ],
        ephemeral: true,
      });
    }
  },
};

export default commandHandler;
