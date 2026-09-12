const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()});
const identifyUser = require("../src/middlewares/auth.middleware");

// @route POST /api/posts [protected route]
// @description Create a new post with a caption and an image
// @body { caption, image-file }

postRouter.post("/",upload.single("image"), identifyUser, postController.createPostController)

// @route GET /api/posts [protected route]
// @description Return all posts made by the user making the request, sorted by creation date in descending order

postRouter.get("/", identifyUser, postController.getPostController);

// @route GET /api/posts/details/:postid [protected route]
// @description Return details about a specific post with the given ID, also check whether the post belongs to the user making the request

// @route POST /api/posts/like/:postId [protected route]
// @description Like a post with the id provided in the request params.

postRouter.post("/like/:postId", identifyUser, postController.likePostController);

postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController);

module.exports = postRouter;