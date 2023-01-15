import express from "express";

import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
} from "../controllers/posts.js "; // curly brackets because it is not default export in posts/controllers

import auth from "../middleware/auth.js";

const router = express.Router();

// http://localhost:5000/posts
// utilize the middleware here: execute the stack inside auth -> next() -> execute the controllers
router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
