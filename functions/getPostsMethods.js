const pool = require("../config/database");

async function getPosts() {
  const [blogPosts] = await pool.query(
    "SELECT * FROM blog_posts ORDER BY createdAt DESC"
  );
  return blogPosts;
}

async function getTagsOfPost(id) {
  const [tags] = await pool.query(
    "SELECT t.tag_name FROM blog_posts b JOIN tag_post tp ON b.blog_post_id = tp.blog_post JOIN tags t ON t.tag_id = tp.tags WHERE blog_post_id = ?",
    [id]
  );
  return tags;
}

async function getPostsByTag(tagId) {
  const [posts] = await pool.query(
    "SELECT * FROM blog_posts b JOIN tag_post tp ON tp.blog_post = b.blog_post_id JOIN tags t ON tp.tags = t.tag_id  WHERE t.tag_name = ? ORDER BY b.createdAt DESC",
    [tagId]
  );
  return posts;
}
async function getOnePostBySlug(slug) {
  const [post] = await pool.query(
    "SELECT * FROM blog_posts b JOIN tag_post tp ON tp.blog_post = b.blog_post_id JOIN tags t ON tp.tags = t.tag_id WHERE b.slug = ?",
    [slug]
  );
  return post;
}

module.exports = [getPosts, getTagsOfPost, getPostsByTag, getOnePostBySlug];
