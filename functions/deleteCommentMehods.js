const pool = require("../config/database");

async function deleteComment(id) {
    const [comment] = await pool.query(
      "DELETE FROM comments WHERE comment_id = (?)",
      [id]
    );
    return comment;
  }
  async function getOnePostBySlug(slug) {
    const [post] = await pool.query(
      "SELECT blog_post_id FROM blog_posts WHERE slug = (?) ",
      [slug]
    );
    return post;
  }

  async function getCommentsIDs(id) {
    const [comments] = await pool.query(
      "SELECT comment_id FROM comments WHERE post_id =(?)",
      [id]
    );
    return comments;
  }

  module.exports = [deleteComment,getOnePostBySlug,getCommentsIDs]