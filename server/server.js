require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("../database/db");
const uploadFileRoute = require("./routes/uploads");

connectToDB();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", uploadFileRoute);

app.use("/uploads", express.static("uploads"));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
