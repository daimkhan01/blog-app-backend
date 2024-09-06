const yup = require("yup");

const createPostSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  content: yup
    .string()
    .required("Content is required")
    .min(10, "Content must be at least 10 characters"),
});

const updatePostSchema = yup.object().shape({
  title: yup.string().optional().min(3, "Title must be at least 3 characters"),
  content: yup
    .string()
    .optional()
    .min(10, "Content must be at least 10 characters"),
});

const postIdParamSchema = yup.object().shape({
  postId: yup.number().required("Post ID is required").positive().integer(),
});

const userIdParamSchema = yup.object().shape({
  userId: yup.number().required("User ID is required").positive().integer(),
});

const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

module.exports = {
  createPostSchema,
  updatePostSchema,
  postIdParamSchema,
  userIdParamSchema,
  signUpSchema,
  loginSchema,
};
