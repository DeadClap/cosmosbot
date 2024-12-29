import { Event } from '../interfaces/Event';
import { version } from '../../package.json';
import getGitBranch from '../utils/gitBranch';
import logger from '../logger';
import { ActivityType } from 'discord.js';

const readyEvent: Event<'ready'> = {
  name: 'ready',
  once: true,
  async execute(client) {
    logger.info(
      `Logged in as: ${client.user?.tag} (Version: ${version} on branch: ${getGitBranch()})`
    );
    logger.info(`Currently a member of ${client.guilds.cache.size} guilds.`);
    client.user.setPresence({
      activities: [{ name: 'The Stars', type: ActivityType.Watching }],
    });
  },
};

export default readyEvent;
