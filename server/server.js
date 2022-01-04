const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

const auth = require("./routes/user");

mongoose
  .connect("mongodb://127.0.0.1/mongochat", { useNewUrlParser: true })
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
