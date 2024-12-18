import { Event } from "./index";
import { Interaction } from 'discord.js'

const commandHandler: Event = {
    name: 'interactionCreate',
    async execute(interaction: Interaction) {
        if (!interaction.isCommand()) return;

        if (interaction.commandName === 'ping') {
            await interaction.reply("PONG!")
        }
    }
}