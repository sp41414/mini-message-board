#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("process");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, "user" VARCHAR (255), text VARCHAR (255), added DATE );
    INSERT INTO messages ("user", added, text) VALUES ('Amando', NOW(), 'Hi!'), ('Charles', NOW(), 'Hello World!');
`;

async function main() {
  const client = new Client({ connectionString: process.env.DBURL || argv[2] });
  await client.connect();
  try {
    await client.query(SQL);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
  console.log("done");
}

main();
