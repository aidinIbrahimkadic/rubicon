const pool = require("../config/database");

async function getOnePostBySlug(slug) {
    const [post] = await pool.query(
      "SELECT * FROM blog_posts WHERE slug = ?",
      [slug]
    );
    return post;
  }

  async function getComments(id) {
    const [comments] = await pool.query(
      "SELECT * FROM comments WHERE post_id = ?",
      [id]
    );
    return comments;
  }

  module.exports = [getOnePostBySlug,getComments]