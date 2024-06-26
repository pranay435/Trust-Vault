const { Client } = require("pg");
const client = new Client({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DB,
  password: process.env.PSQL_PASS,
  port: 5432,
});

const client2 = new Client({
  user: process.env.PSQL_USER2,
  host: process.env.PSQL_HOST2,
  database: process.env.PSQL_DB2,
  password: process.env.PSQL_PASS2,
  port: 5432,
});

module.exports = { client, client2 };
