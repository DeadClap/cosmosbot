import { Client, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv';
import { loadEvents } from "./loadEvents";


dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds]})

loadEvents(client)

try {
    client.login(process.env.DISCORD_TOKEN)
} catch (error) {
    console.error(error)
}