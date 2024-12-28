import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { Command } from './interfaces/Command';
import { GuildResolvable } from 'discord.js';
import logger from './logger';

export async function loadCommands(): Promise<Command[]> {
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith('.ts')
  );

  const commands: Command[] = [];
  const globalCommands: Command[] = [];
  const guildCommands: Map<string, Command[]> = new Map();

  for (const file of commandFiles) {
    try {
      const command = require(`${commandsPath}/${file}`).default as Command;

      // Validate command structure
      if (!command || !command.data || !command.execute) {
        logger.warn(`Skipped invalid command file: ${file}`);
        continue;
      }

      commands.push(command);

      if (command.guilds) {
        const guildIds = Array.isArray(command.guilds)
          ? command.guilds.map(resolveGuildId)
          : [resolveGuildId(command.guilds)];

        for (const guildId of guildIds) {
          if (!guildCommands.has(guildId)) {
            guildCommands.set(guildId, []);
          }
          guildCommands.get(guildId)!.push(command); // Add command to the guild's list
        }
      } else {
        globalCommands.push(command);
      }
    } catch (error) {
      console.error(`Error loading command file ${file}:`, error);
    }
  }

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

  try {
    // Register global commands
    logger.warn('Refreshing global application (/) commands...');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: globalCommands.map((cmd) => cmd.data.toJSON()),
    });
    logger.info('Successfully reloaded global application (/) commands.');

    // Register guild-specific commands
    for (const [guildId, commands] of guildCommands) {
      logger.warn(`Refreshing guild-specific commands for guild ${guildId}...`);
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID!, guildId),
        { body: commands.map((cmd) => cmd.data.toJSON()) } // Send all commands for the guild at once
      );
      logger.info(
        `Successfully reloaded guild-specific commands for guild ${guildId}.`
      );
    }
  } catch (error) {
    console.error('Error refreshing commands:', error);
  }

  return commands; // Return all commands (global and guild-specific)
}

// Helper function to resolve GuildResolvable to a string (guild ID)
function resolveGuildId(guild: GuildResolvable): string {
  if (typeof guild === 'string') {
    return guild; // Already a guild ID
  } else if ('id' in guild) {
    return guild.id; // Resolve Guild object to ID
  }
  throw new Error('Invalid GuildResolvable provided');
}
