import express from "express";

import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
} from "../controllers/posts.js "; // curly brackets because it is not default export in posts/controllers

const router = express.Router();

// http://localhost:5000/posts
router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost); // update things
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;
