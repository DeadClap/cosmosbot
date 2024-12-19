import { Event } from "./index";
import { ChatInputApplicationCommandData, ChatInputCommandInteraction, Interaction } from 'discord.js'
import { Command } from "../commands";

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
            console.error(`Error ececuting command: "${interaction.commandName}`, error)
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });        }
    }
}

export default commandHandler