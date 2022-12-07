const [
  getOnePostBySlug,
  updatePost,
  getPosts,
] = require("../functions/updatePostMethod");

const updatePostController = async (req, res) => {
  const slug = req.params.slug;

  //GET POST WITH SLUG
  const post = await getOnePostBySlug(slug).then((r) => {
    return r[0];
  });

  if (!post) {
    res.send("No posts with that slug");
    return;
  }

  console.log("BLA" + req.body.blogPost.title);

  //CREATE NEW OBJECT WITH DATA FROM EXISTING POST
  const newObj = {
    slug: slug,
    title: post.title,
    description: post.description,
    body: post.body,
    updatedAt: new Date(),
    blog_post_id: post.blog_post_id,
  };
  //Add all data from post and check if they exist

  const title = req.body.blogPost.title;

  const description = req.body.blogPost.description;
  const body = req.body.blogPost.body;

  if (title) {
    newObj.title = title;
    newObj.slug = newObj.title.toLowerCase().split(" ").join("-");
  }
  if (description) newObj.description = description;
  if (body) newObj.body = body;

  //CHECK IF THAT SLUG ALREADY EXISTS IN TABLE
  const allPosts = await getPosts().then((response) => {
    return response;
  });

  let exists = false;
  for (let i = 0; i < allPosts.length; i++) {
    if (allPosts[i].slug === newObj.slug) {
      exists = true;
    }
  }

  if (!exists) {
    //UPDATE BLOG POST FROM newObj OBJECT
    await updatePost(newObj);

    //SEND UPDATED BLOG POST
    res.redirect(`/api/posts/${newObj.slug}`);
  } else {
    res.send("That slug already exists");
  }
};

module.exports = updatePostController;
