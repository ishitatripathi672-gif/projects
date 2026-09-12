const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../src/middlewares/auth.middleware");

const userRouter = express.Router();

// @route POST /api/users/follow/:userId
// @desc Follow a user
// @access Private
userRouter.post("/follow/:username", identifyUser, userController.followUserController);

// @route POST /api/users/unfollow/:userId
// @desc Unfollow a user
// @access Private
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController);


module.exports = userRouter;