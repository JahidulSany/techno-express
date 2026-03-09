require('dotenv').config();

const Sequelize = require('sequelize');

if (process.env.DB_PASSWORD === 'ChangeMe!') {
  console.error('Please update the .env file with your database password.');
  process.exit(1);
}

let sequelize;

if (process.env.DATABASE_URL) {
  // Render production database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(
        process.env.DB_DATABASE,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          dialect: process.env.DB_DIALECT || 'postres',
          port: process.env.DB_PORT || 5433,
        },
      );
}

module.exports = sequelize;
