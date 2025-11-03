require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("ABC General Store API"));

app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

// static images (if you add images in backend/public/images)
app.use("/images", express.static("public/images"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
