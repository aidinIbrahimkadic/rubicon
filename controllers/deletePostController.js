const [
  deletePost,
  getPost,
  deleteForeignKeys,
] = require("../functions/deletePostMethod");

const deletePostController = async (req, res) => {
  const slug = req.params.slug;

  const id = await getPost(slug).then((result) => {
    if (result.length === 1) return result[0].blog_post_id;
  });
  if (!id) res.send("No posts with that slug");

  await deleteForeignKeys(id);
  await deletePost(slug);

  res.send("Post deleted");
};

module.exports = deletePostController;
