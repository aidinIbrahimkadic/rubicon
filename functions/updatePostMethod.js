const pool = require("../config/database");

async function getOnePostBySlug(slug) {
  const [post] = await pool.query(
    "SELECT blog_post_id, slug, title, description, body, createdAt, updatedAt FROM blog_posts  WHERE slug = ? LIMIT 1",
    [slug]
  );
  return post;
}

async function updatePost(obj) {
  const [post] = await pool.query(
    "UPDATE blog_posts SET slug=?, title = ?, description = ?, body = ?, updatedAt = ? WHERE blog_post_id = ?",
    [
      obj.slug,
      obj.title,
      obj.description,
      obj.body,
      obj.updatedAt,
      obj.blog_post_id,
    ]
  );
  return post;
}
async function getPosts() {
  const [blogPosts] = await pool.query(
    "SELECT * FROM blog_posts ORDER BY createdAt DESC"
  );
  return blogPosts;
}

module.exports = [getOnePostBySlug, updatePost, getPosts];
