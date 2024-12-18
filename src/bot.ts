import { Client, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv';
import { version } from '../package.json'
import getGitBranch from "./utils/gitBranch";

dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds]})

client.once('ready', () => {
    console.log(`Logged in as: ${client.user?.tag} (Version: ${version} on branch: ${getGitBranch()})`)
})

try {
    client.login(process.env.DISCORD_TOKEN)
} catch (error) {
    console.error(error)
}