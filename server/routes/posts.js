const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Post = require("../model/Post");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const PAGE_SIZE = 10;
    const page = await parseInt(req.query.page || "0");
    const filter = await req.query.q;

    if (filter === "all") {
      const total = await Post.countDocuments();
      const posts = await Post.find()
        .sort({ createdAt: "desc" })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);

      res.json({ totalPages: Math.ceil(total / PAGE_SIZE), posts });
    } else {
      const total = await Post.countDocuments({ category: filter });
      const posts = await Post.find({ category: filter })
        .sort({
          createdAt: "desc",
        })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);
      res.json({ totalPages: Math.ceil(total / PAGE_SIZE), posts });
    }
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/unique/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: "Böyle bir post yok...", errorMessage: err });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    res.json(post);
  } catch (err) {
    res.json({ message: "Böyle bir post yok...", errorMessage: err });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();

    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
router.put("/:postId", auth, async (req, res) => {
  try {
    const { title, description, image, body, tag } = req.body;

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { title, description, image, body, tag, category: _.lowerCase(tag) }
    );

    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/:postId", auth, async (req, res) => {
  try {
    const removedPost = await Post.findByIdAndDelete(req.params.postId);
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
