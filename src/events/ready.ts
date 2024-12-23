import { Event } from "./index";
import { version } from '../../package.json'
import getGitBranch from "../utils/gitBranch";
import logger from "../logger";


const readyEvent: Event = {
    name: 'ready',
    once: true,
    async execute(client) {
        logger.info(`Logged in as: ${client.user?.tag} (Version: ${version} on branch: ${getGitBranch()})`)
        logger.info(`Currently a member of ${client.guilds.cache.size} guilds.`)
    }
}

export default readyEvent;