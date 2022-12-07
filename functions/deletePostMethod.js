const pool = require("../config/database");

async function getPost(slug) {
  const [post] = await pool.query(
    "SELECT blog_post_id FROM blog_posts WHERE slug = ?",
    [slug]
  );
  return post;
}

async function deleteForeignKeys(id) {
  await pool.query("DELETE FROM tag_post WHERE blog_post = ?", [id]);
}

async function deletePost(slug) {
  await pool.query("DELETE FROM blog_posts WHERE slug = ?", [slug]);
}

module.exports = [deletePost, getPost, deleteForeignKeys];
