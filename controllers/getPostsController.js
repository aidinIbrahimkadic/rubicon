//Import async functions with queries
const [getPosts,getTagsOfPost,getPostsByTag] = require('../functions/getPostsMethods')

const getPostsController = async(req,res)=>{

  //container for final results
  const resultObj={
  };

  let allPosts;

  //check if there is a tag in url; if yes get only posts with that tag to allPosts, else get all posts
    if(req.query.tag){
      allPosts = await getPostsByTag(req.query.tag).then(result=>{
        return result
      })
    }else{
      //get all posts from database
      allPosts = await getPosts().then(result=>{
        return result
      })
    }

    //If there are more than one post then name variable with plural and declare it as an array
   if(allPosts.length>1){
    resultObj.blogPosts =[];
   }

  //Loop through all posts
    for(let i=0; i<allPosts.length; i++){

      //container for all tags of one post
      const tagArr = [];

      //get all tags
      const allTags = await getTagsOfPost(allPosts[i].blog_post_id).then(result=>{
        return result
      })

      //loop through results of the tags query and push them to tags array  
      for(let j = 0;j<allTags.length; j++){
        tagArr.push(allTags[j].tag_name)
      }

      //if there is only one post result
      if(allPosts.length===1){
        resultObj.blogPost = {
          slug: allPosts[i].slug,
          title: allPosts[i].title,
          description: allPosts[i].description,
          tags: tagArr,
          createdAt: allPosts[i].createdAt,
          updatedAt: allPosts[i].updatedAt,
        }
      }else{
        resultObj.blogPosts.push({
          slug: allPosts[i].slug,
          title: allPosts[i].title,
          description: allPosts[i].description,
          tags: tagArr,
          createdAt: allPosts[i].createdAt,
          updatedAt: allPosts[i].updatedAt,
        });
        resultObj.postCount = i+1;
      }
    }
    
  res.send(resultObj);
}

module.exports = getPostsController;
