const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
require("dotenv").config();

const { sequelize } = require("./models");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 8000;

const initialize = async () => {
  await sequelize.authenticate().then(() => {
    console.log("Database connection successful!");
  });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
initialize();
