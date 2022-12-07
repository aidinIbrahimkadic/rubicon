const [getOnePostBySlug,getComments] =require('../functions/getCommentsMethods')

const getCommentsController =async (req,res)=>{
const slug = req.params.slug;

const postId = await getOnePostBySlug(slug).then(r=>{
    return r[0].blog_post_id;
})

const allComments = await getComments(postId).then(r=>{
    return r
})

const response = {
    comments:[]
}
allComments.forEach(c=>{
    response.comments.push({
        id: c.comment_id,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        body: c.body
    })
})
res.send(response);
}

module.exports= getCommentsController;