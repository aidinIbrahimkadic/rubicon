# API exercise

All APIs:

//POSTS
#router.get("/posts", require("../controllers/getPostsController"));
#router.get("/posts/:slug", require("../controllers/getOnePostController"));
#router.post("/posts", require("../controllers/postPostController"));
#router.put("/posts/:slug", require("../controllers/updatePostController"));
#router.delete("/posts/:slug", require("../controllers/deletePostController"));

#//TAGS
#router.get("/tags", require("../controllers/getTagsController"));

#//COMMENTS
#router.get('/posts/:slug/comments', require("../controllers/getCommentsController"));
#router.post('/posts/:slug/comments', require("../controllers/postCommentController"));
#router.delete('/posts/:slug/comments/:id', require('../controllers/deleteCommentController'));

#Dependencies:
#mysql2, express, dotenv
