const pool = require("../config/database");

async function getPosts() {
  const [blogPosts] = await pool.query(
    "SELECT * FROM blog_posts ORDER BY createdAt DESC"
  );
  return blogPosts;
}

async function postPost([...args]) {
  const [newPost] = await pool.query(
    "INSERT INTO blog_posts (slug, title, description, body, createdAt, updatedAt) VALUES (?)",
    [args]
  );
  return newPost;
}

async function getTags() {
  const [tags] = await pool.query("SELECT * FROM tags");
  return tags;
}
async function postTags(tag) {
  const [newTags] = await pool.query("INSERT INTO tags (tag_name) VALUE (?)", [
    tag,
  ]);
  return newTags;
}

async function postTagPost(postId, tagId) {
  const [newTagPost] = await pool.query(
    "INSERT INTO tag_post (blog_post,tags) VALUES (?,?)",
    [postId, tagId]
  );
  return newTagPost;
}

module.exports = [postPost, getPosts, getTags, postTags, postTagPost];
