import { SlashCommandBuilder } from "discord.js";
import { Command } from "./index";

const pingCommand: Command = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies Pong!'),
    async execute(interaction) {
        await interaction.reply("Pong!")
    }
}

export default pingCommand;