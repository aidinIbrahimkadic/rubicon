const [deleteComment,getOnePostBySlug,getCommentsIDs] =require('../functions/deleteCommentMehods');

const deleteCommentController = async (req,res)=>{

    const id = req.params.id;

    const slug = req.params.slug;

    const postId = await getOnePostBySlug(slug).then(r=>{
        return r[0].blog_post_id
    })

    const comments = await getCommentsIDs(postId).then(r=>{
        return r;
    })

    console.log(comments);

    console.log(id);

    let exist = false;
    comments.forEach(c=>{
        if(c.comment_id == id){
            exist= true;
        }
    })

    if(exist){
        await deleteComment(id);
        res.send("Comment deleted...");
    }else{
        res.send("Comment with that ID does not belong to that post")
    }
}

module.exports =deleteCommentController;