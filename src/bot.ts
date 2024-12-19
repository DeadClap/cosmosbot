import { Client, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv';
import { loadEvents } from "./loadEvents";
import { loadCommands } from "./loadCommands";
import { setCommands } from "./events/commandHandler";
import logger from "./logger";

dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds]});


logger.info("test");
logger.warn("warn");
logger.error("test");






(async () => {
    const commands = await loadCommands();
    setCommands(commands);
    loadEvents(client);
    client.login(process.env.DISCORD_TOKEN)
})();