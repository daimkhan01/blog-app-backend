const { Post } = require("../models");

exports.checkPostOwnership = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user.id;

  try {
    const post = await Post.findOne({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this post" });
    }

    // pass to the next middleware
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
