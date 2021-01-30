const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const app = express();
const path = require("path");
// load config
dotenv.config({ path: "./config/config.env" });

// db connection
connectDb();

app.use(express.json({ extended: false }));

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/images", require("./routes/images"));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('frontend/build'));
// }

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`app is listion on port ${PORT}`));
