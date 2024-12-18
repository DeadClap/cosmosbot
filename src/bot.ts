import { Client, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv';


dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds]})

try {
    client.login(process.env.DISCORD_TOKEN)
} catch (error) {
    console.error(error)
}