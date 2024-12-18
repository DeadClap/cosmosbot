import { readdirSync } from "fs";
import path from "path";
import { REST, Routes } from 'discord.js';
import { Command } from './commands'
import dotenv from 'dotenv';
import logger from "./logger";

dotenv.config()

export async function loadCommands() {
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    const commands: Command[] = [];
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file)).default;
        if (command && command.data) {
            commands.push(command)
        }
    }

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN || "");

    try {
        logger.warn(`Refreshing application (/) commands...`)

        const body = commands.map(cmd => cmd.data.toJSON());
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID || ""),{
            body
        })
        logger.info('Successfully reloaded application (/) commands!')
    } catch (error) {
        logger.error('Error refreshing application (/) commands:',error)
    }

    return commands
}