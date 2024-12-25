# CosmosBot Commands

## Commands Overview

This document provides an overview of all available commands in CosmosBot. These commands are categorized into features such as utility, fun, and moderation tools.

---

### Eval Command

- **Description**: Evaluate JavaScript code (restricted to bot owner or application team admins).
- **Usage**:
  ```
  /eval <code>
  ```
- **Example**:
  ```
  /eval "2 + 2"
  ```
- **Security**:
  - Only accessible to the bot owner and team admins.
  - Automatically blocks attempts to access `client.token` or other sensitive properties.

---

### Dice Roll Command

- **Description**: Roll dice in formats like `1d6`, `2d20+3`, etc.
- **Usage**:
  ```
  /roll <dice>
  ```
- **Example**:
  ```
  /roll 2d6+3
  ```
- **Features**:
  - Supports complex rolls with modifiers.
  - Displays results and total in a clean embed.

---

### Rock-Paper-Scissors Command

- **Description**: Play Rock-Paper-Scissors against the bot.
- **Usage**:
  ```
  /rps <choice>
  ```
- **Example**:
  ```
  /rps rock
  ```
- **Features**:
  - Displays your choice, bot's choice, and the result in an embed.

---

## Planned Features

- More interactive games.
- Moderation commands.
- Dynamic content generation based on user input.

