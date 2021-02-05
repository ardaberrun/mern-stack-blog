const mongoose = require("mongoose");
const slugify = require("slugify");

const PostSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

PostSchema.pre("validate", function (next) {
  if (this.title) {
    const slug = `${this.title} ${(Math.random() + 1)
      .toString(36)
      .substring(7)}`;
    this.slug = slugify(slug, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Post", PostSchema);