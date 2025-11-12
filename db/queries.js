const pool = require("./pool");

async function queryMessages() {
  const { rows } = await pool.query("SELECT * FROM messages;");
  return rows;
}

async function fetchMessage(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function insertMessage({ text, user }) {
  await pool.query(
    'INSERT INTO messages ("user", added, text) VALUES ($1, NOW(), $2)',
    [user, text]
  );
}

module.exports = {
  queryMessages,
  fetchMessage,
  insertMessage,
};
