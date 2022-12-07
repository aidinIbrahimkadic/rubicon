const pool = require("../config/database");


async function getOnePostBySlug(slug) {
    const [post] = await pool.query(
      "SELECT blog_post_id, slug, title, description, body, createdAt, updatedAt FROM blog_posts  WHERE slug = ? LIMIT 1",
      [slug]
    );
    return post;
  }


  async function postComment(obj) {
    const [newComment] = await pool.query(
      "INSERT INTO comments (body, createdAt,updatedAt,post_id) VALUES (?,?,?,?)",
      [obj.body, obj.createdAt,obj.updatedAt,obj.post_id]
    );
    return newComment;
  }

  async function getComment(id) {
    const [newComment] = await pool.query(
      "SELECT * FROM comments WHERE comment_id =(?)",
      [id]
    );
    return newComment;
  }
module.exports = [getOnePostBySlug,postComment,getComment ];
