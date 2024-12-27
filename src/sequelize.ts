import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'cosmosbot',
  process.env.DB_USER || 'cosmosbot',
  process.env.DB_PASSWORD || 'somepassword',
  {
    host: process.env.DB_HOST || 'localhost', // Update to your database host (e.g., IP address or domain)
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mariadb', // Specify MariaDB dialect
    logging: false, // Disable logging for cleaner output
  }
);

export default sequelize;
