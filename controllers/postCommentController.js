const [getOnePostBySlug,postComment,getComment] = require('../functions/postCommentMethods');

const postCommentController = async (req,res)=>{
    const slug =req.params.slug; 
    const body = req.body.comment.body;

    const postId = await getOnePostBySlug(slug).then(r=>{
        return r[0].blog_post_id;
    })

    const newComment = {
        body:body,
        createdAt: new Date(),
        updatedAt: new Date(),
        post_id: postId
    }

    const newCommentId = await postComment(newComment).then(r=>{
        return r.insertId;
    })

    const result = await getComment(newCommentId).then(r=>{
        return r[0];
    })

    const responseComment = {
        comment:{
            id:result.comment_id,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            body: result.body
        }
    }

    res.send(responseComment)
}

module.exports =postCommentController;