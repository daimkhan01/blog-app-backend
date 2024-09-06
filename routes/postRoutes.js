const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostsByUser,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");
const { checkPostOwnership } = require("../middleware/checkPostOwnership");

const router = express.Router();

// get all posts
router.get("/", getAllPosts);

// get post by ID
router.get("/:postId", getPostById);

// create post
router.post("/", protect, createPost);

// update post
router.put("/:postId", protect, checkPostOwnership, updatePost);

// delete post
router.delete("/:postId", protect, checkPostOwnership, deletePost);

// get post by user
router.get("/user/:userId", protect, getPostsByUser);

module.exports = router;
