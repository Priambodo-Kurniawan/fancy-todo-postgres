require('dotenv').config()

module.exports = {
  development: {
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    url: process.env.DEV_DATABASE_URL,
    dialect: process.env.DEV_DATABASE_DIALECT,
    username: process.env.DEV_DATABASE_USERNAME,
    password: process.env.DEV_DATABASE_PASSWORD,
    database: process.env.DEV_DATABASE_DATABASE,
    host: process.env.DEV_DATABASE_HOST,
    port: process.env.DEV_DATABASE_PORT,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
}