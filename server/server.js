const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const postRoute = require("./routes/posts");
const aboutRoute = require("./routes/about");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/post", postRoute);
app.use("/about", aboutRoute);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Server is on!" });
});

mongoose.connect(
  // process.env.MONGO_URI,
  'mongodb://localhost/busDB',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  (err) => {
    if (err) console.log("Db is not connected!");

    console.log("DB connected successfully!");
  }
);

app.listen(PORT, () => {
  console.log("Server is running!");
});
