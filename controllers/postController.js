const postService = require("../Services/PostServices");
const {
  createPostSchema,
  updatePostSchema,
  postIdParamSchema,
  userIdParamSchema,
} = require("../controllers/validationSchemas");

exports.createPost = async (req, res) => {
  try {
    await createPostSchema.validate(req.body, { abortEarly: false });

    const { title, content } = req.body;
    const userId = req.user.id;

    const post = await postService.createPost(userId, title, content);

    res.status(201).json(post);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    await postIdParamSchema.validate(req.params);
    await updatePostSchema.validate(req.body, { abortEarly: false });

    const { postId } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;

    const post = await postService.updatePost(postId, userId, title, content);

    res.status(200).json(post);
  } catch (error) {
    if (
      error.message === "Post not found" ||
      error.message === "Not authorized"
    ) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await postIdParamSchema.validate(req.params);

    const { postId } = req.params;
    const userId = req.user.id;

    const message = await postService.deletePost(postId, userId);

    res.status(200).json(message);
  } catch (error) {
    if (
      error.message === "Post not found" ||
      error.message === "Not authorized"
    ) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 9;
  const searchTerm = req.query.search || "";

  try {
    const { posts, totalPages } = await postService.getAllPosts(
      page,
      pageSize,
      searchTerm
    );

    res.status(200).json({ posts, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    await postIdParamSchema.validate(req.params);

    const { postId } = req.params;

    const post = await postService.getPostById(postId);

    res.status(200).json(post);
  } catch (error) {
    if (error.message === "Post not found") {
      return res.status(404).json({ message: "Post not found" });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    await userIdParamSchema.validate(req.params);

    const { userId } = req.params;

    const posts = await postService.getPostsByUser(userId);

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
