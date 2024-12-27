import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { loadEvents } from './loadEvents';
import { loadCommands } from './loadCommands';
import { setCommands } from './events/commandHandler';
import sequelize from './sequelize';
import logger from './logger';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

(async () => {
  try {
    await sequelize.authenticate();
    logger.info(`Connected Successfully to MariaDB`);

    await sequelize.sync();
    logger.info(`Database Syncronized!`);
  } catch (error) {
    logger.error(`Failed to connect to the database: ${error}`);
  }
  const commands = await loadCommands();
  setCommands(commands);
  loadEvents(client);
  client.login(process.env.DISCORD_TOKEN);
})();
