const pool = require("../config/database");

async function getTags() {
  const [post] = await pool.query("SELECT * FROM tags");
  return post;
}

module.exports = getTags;
