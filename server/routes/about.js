const express = require("express");

const router = express.Router();
const About = require("../model/About");

const defaultAbout = {
  title: "Merhaba, Hakkımda Sayfama Hoşgeldin",
  body: `Lorem Ipsum is simply dummy text of the printing and typesetting 
    industry. Lorem Ipsum has been the industry's standard dummy text ever 
    since the 1500s, when an unknown printer took a galley of type and 
    scrambled it to make a type specimen book. It has survived not only 
    five centuries, but also the leap into electronic typesetting, 
    remaining essentially unchanged. It was popularised in the 1960s 
    with the release of Letraset sheets containing Lorem Ipsum passages, 
    and more recently with desktop publishing software like Aldus PageMaker 
    including versions of Lorem Ipsum.Contrary to popular belief, 
    Lorem Ipsum is not simply random text. It has roots in a piece of 
    classical Latin literature from 45 BC, making it over 2000 years old. 
    Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, 
    looked up one of the more obscure Latin words, consectetur, `,
  image: "https://via.placeholder.com/150/92c952",
};

router.get("/", async (req, res) => {
  try {
    const about = await About.find();
    if (about.length == 0) {
      const myDefaultAbout = new About(defaultAbout);
      const saved = await myDefaultAbout.save();
      res.json(saved);
    } else {
      res.json(about);
    }
  } catch (e) {
    res.json({ message: e });
  }
});

router.put("/:aboutId", async (req, res) => {
  try {
    const { title, image, body } = req.body;

    const updatedAbout = await About.findOneAndUpdate(
      { _id: req.params.aboutId },
      { title, image, body }
    );

    res.json(updatedAbout);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
