require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DIALECT,
    operatorsAliases: false,
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DIALECT,
    operatorsAliases: false,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DIALECT,
    operatorsAliases: false,
  },
};
