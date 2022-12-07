const [
  postPost,
  getPosts,
  getTags,
  postTags,
  postTagPost,
] = require("../functions/postPostMethods");

const postPostController = async (req, res) => {
  
  const title = req.body.blogPost.title;
  const slug = title.toLowerCase().split(" ").join("-");
  const description = req.body.blogPost.description;
  const body = req.body.blogPost.body;
  const tagList = req.body.blogPost.tagList;
  const createdAt = new Date();
  const updatedAt = createdAt;

  const allPosts = await getPosts().then((response) => {
    return response;
  });

  //Check if post exist in database
  let exists = false;
  for (let i = 0; i < allPosts.length; i++) {
    if (allPosts[i].slug === slug) {
      exists = true;
    }
  }

  //Add post to database
  if (exists) {
    res.send("Post with that name already exists");
  } else {
    const postId = await postPost([
      slug,
      title,
      description,
      body,
      createdAt,
      updatedAt,
    ]).then((response) => {
      return response.insertId;
    });

    //get all tags from database
    const tagsInDB = await getTags().then((response) => {
      return response;
    });

    let newTagsID = [];

    //Check if input tags exist in database and add them to tb. Get all tags id to newTagsID array
    for (let i = 0; i < tagList.length; i++) {
      let tagExists = false;

      for (let j = 0; j < tagsInDB.length; j++) {
        if (tagList[i] === tagsInDB[j].tag_name) {
          tagExists = true;
          newTagsID.push(tagsInDB[j].tag_id);
        }
      }

      if (!tagExists) {
        const newTag = await postTags(tagList[i]).then((response) => {
          return response.insertId;
        });
        newTagsID.push(newTag);
      }
    }

    //Add to tag_post table
    for (let i = 0; i < newTagsID.length; i++) {
      await postTagPost(postId, newTagsID[i]);
    }

    res.redirect(`/api/posts/${slug}`);
  }
};

module.exports = postPostController;
