const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const logger = require('./logger');

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ?? 3306,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Test connection
(async () => {
  try {
    const connection = await pool.getConnection();
    logger.info('Successfully connected to the database.');
    connection.release();
  } catch (err) {
    logger.error('Error connecting to the database:', err);
  }
})();

module.exports = pool;
