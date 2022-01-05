const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

const auth = require("./routes/user");

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(`Database connected successfully`);
  })
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;
app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_APP_URL],
    credentials: true,
  })
);

app.use("/api/auth", auth);

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
