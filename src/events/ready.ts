import { Event } from "./index";
import { version } from '../../package.json'
import getGitBranch from "../utils/gitBranch";

const readyEvent: Event = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as: ${client.user?.tag} (Version: ${version} on branch: ${getGitBranch()})`)
    }
}