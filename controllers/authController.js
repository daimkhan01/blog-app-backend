const authService = require("../Services/AuthServices");
const {
  signUpSchema,
  loginSchema,
} = require("../controllers/validationSchemas");

exports.signUp = async (req, res) => {
  try {
    await signUpSchema.validate(req.body, { abortEarly: false });

    const { name, email, password } = req.body;

    const result = await authService.signUpUser(name, email, password);

    res.status(201).json(result);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.errors });
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });

    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Incorrect email or password") {
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
