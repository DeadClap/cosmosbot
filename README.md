# Discord Bot - CosmosBot

CosmosBot is a feature-rich Discord bot built with Discord.js and TypeScript. This bot includes moderation commands, utility features, and fun commands to enhance your Discord server experience.

## Features

- **Evaluation Command**: Run JavaScript code securely with admin and developer restrictions.
- **Role-Based Permissions**: Restrict sensitive commands to application team members with appropriate roles.
- **Dice Roll Command**: Roll dice in various formats, like `2d6+3`, for games and fun.
- **Rock-Paper-Scissors Command**: Play RPS against the bot with clean embed-based responses.
- **Dynamic Logging**: Logs bot activities, warnings, and errors for debugging and monitoring.

## Installation

### Prerequisites

- Node.js 16.6.0 or later
- npm or yarn
- A Discord bot token

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/DeadClap/cosmosbot.git
   cd cosmosbot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your bot token:

   ```env
   DISCORD_TOKEN=your-bot-token
   CLIENT_ID=your-app-client-id
   ```

4. Compile the TypeScript code:

   ```bash
   npm run build
   ```

5. Start the bot:

   ```bash
   npm run start
   ```

## Commands

The full list of commands is available [here](docs/COMMANDS.md).

## Configuration

### Environment Variables

- `DISCORD_TOKEN`: Your bot's token from the Discord Developer Portal.
- `GUILDS`: Comma-separated list of guild IDs for testing slash commands.

### Logger

The bot uses a custom logging system to log events, warnings, and errors. Logs are written to `logs/app.log` and displayed in the console.

## Development

### Run the Bot in Development Mode

```bash
npm run dev
```

### Compile TypeScript

```bash
npm run build
```

## Security Notes

1. **Eval Command**:
   - Accessible only by the bot owner or team admins.
   - Automatically blocks sensitive operations like accessing `client.token`.
2. **Environment Variables**:
   - Keep your `.env` file secure and out of version control.

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

- [Discord.js](https://discord.js.org/) - Powerful Node.js library for interacting with the Discord API.
- The awesome open-source community for contributing to bot development tools.

