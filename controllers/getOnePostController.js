const [
  getOnePostBySlug,
  getTagsOfPost,
] = require("../functions/getPostMethods");

const getOnePostController = async (req, res) => {
  const slug = req.params.slug;
  const post = await getOnePostBySlug(slug).then((result) => {
    return result;
  });

  let result = {};

  //container for all tags of one post
  const tagArr = [];

  //get all tags
  if (post.length === 1) {
    const allTags = await getTagsOfPost(post[0].blog_post_id).then((result) => {
      return result;
    });

    //loop through results of the tags query and push them to tags array
    for (let j = 0; j < allTags.length; j++) {
      tagArr.push(allTags[j].tag_name);
    }
    result.blogPost = {
      slug: post[0].slug,
      title: post[0].title,
      description: post[0].description,
      tags: tagArr,
      createdAt: post[0].createdAt,
      updatedAt: post[0].updatedAt,
    };
    res.send(result);
  } else {
    res.send("No posts with that slug");
  }

  //push post data and tag array to result array
};

module.exports = getOnePostController;
