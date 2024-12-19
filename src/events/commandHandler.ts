import { Event } from "./index";
import { ChatInputApplicationCommandData, ChatInputCommandInteraction, Interaction } from 'discord.js'
import { Command } from "../commands";
import logger from "../logger";

let commands: Command[] = []

export function setCommands(loadedCommands: Command[]) {
    commands = loadedCommands
}

const commandHandler: Event = {
    name: 'interactionCreate',
    async execute(interaction: Interaction) {
        if (!interaction.isCommand()) return;

        const command = commands.find(cmd => cmd.data.name === interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction as ChatInputCommandInteraction)
        } catch (error) {
            logger.warn(`Error executing command: "${interaction.commandName}`, error)
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });        }
    }
}

export default commandHandler