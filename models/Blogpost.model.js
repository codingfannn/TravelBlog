const mongoose = require("mongoose");

const blogpostSchema = new mongoose.Schema({
  test: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  image: {
    type: String,
  },
  timestamps: true,
});

const Blogpost = mongoose.model("Blogpost", blogpostSchema);

module.exports = Blogpost;
