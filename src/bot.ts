import { Client, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv';
import { loadEvents } from "./loadEvents";
import { loadCommands } from "./loadCommands";
import { setCommands } from "./events/commandHandler";


dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds]});

(async () => {
    console.log('Loading Commands')
    const commands = await loadCommands();
    console.log("Setting Commands")
    setCommands(commands);
    console.log("Loading events")
    loadEvents(client);
    console.log("Logging In")
    client.login(process.env.DISCORD_TOKEN)
})();