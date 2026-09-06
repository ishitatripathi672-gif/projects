const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({storage:multer.memoryStorage()});
const identifyUser = require("../src/middlewares/auth.middleware");

// POST /api/posts [protected route]
// req.body = { caption, image-file }

postRouter.post("/",upload.single("image"), identifyUser, postController.createPostController)

// GET /api/posts [protected route]

postRouter.get("/", identifyUser, postController.getPostController);

// GET /api/posts/details/:postid [protected route]
// retun a detail about specific post with the id also check whether the post belongs to the user that is requesting come from

postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController);

module.exports = postRouter;