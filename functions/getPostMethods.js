const pool = require("../config/database");

async function getOnePostBySlug(slug) {
  const [post] = await pool.query(
    "SELECT blog_post_id, slug, title, description, body, createdAt, updatedAt FROM blog_posts  WHERE slug = ? LIMIT 1",
    [slug]
  );
  return post;
}
async function getTagsOfPost(id) {
  const [tags] = await pool.query(
    "SELECT t.tag_name FROM blog_posts b JOIN tag_post tp ON b.blog_post_id = tp.blog_post JOIN tags t ON t.tag_id = tp.tags WHERE blog_post_id = ?",
    [id]
  );
  return tags;
}

module.exports = [getOnePostBySlug, getTagsOfPost];
