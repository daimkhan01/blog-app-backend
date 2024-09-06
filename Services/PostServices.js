const { Post, User } = require("../models");
const { Op } = require("sequelize");

exports.createPost = async (userId, title, content) => {
  const post = await Post.create({
    title,
    content,
    user_id: userId,
  });

  const user = await User.findByPk(userId);

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    userId: post.user_id,
    userName: user.name,
    userEmail: user.email,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
};

exports.updatePost = async (postId, userId, title, content) => {
  const post = await Post.findByPk(postId);
  if (!post) throw new Error("Post not found");
  if (post.user_id !== userId) throw new Error("Not authorized");

  post.title = title || post.title;
  post.content = content || post.content;

  await post.save();

  return post;
};

exports.deletePost = async (postId, userId) => {
  const post = await Post.findByPk(postId);
  if (!post) throw new Error("Post not found");
  if (post.user_id !== userId) throw new Error("Not authorized");

  await post.destroy();

  return { message: "Post deleted successfully" };
};

exports.getAllPosts = async (page, pageSize, searchTerm) => {
  const offset = (page - 1) * pageSize;

  const { count, rows: posts } = await Post.findAndCountAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit: pageSize,
    offset,
  });

  const totalPages = Math.ceil(count / pageSize);

  return { posts, totalPages };
};

exports.getPostById = async (postId) => {
  const post = await Post.findOne({
    where: { id: postId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name", "email"],
      },
    ],
  });

  if (!post) throw new Error("Post not found");

  return post;
};

exports.getPostsByUser = async (userId) => {
  const posts = await Post.findAll({ where: { user_id: userId } });

  return posts;
};
