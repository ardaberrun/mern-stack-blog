const express = require("express");
const router = express.Router();
const Post = require("../model/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" });
    res.json(posts);
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

router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();

    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
router.put("/:postId", async (req, res) => {
  try {
    const { title, image, body, tag } = req.body;

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      { title, image, body, tag }
    );

    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.findByIdAndDelete(req.params.postId);
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;