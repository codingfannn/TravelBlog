const mongoose = require("mongoose");

const blogpostSchema = new mongoose.Schema({
  text: {
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
  startVacation: Date,
  endVacation: Date,
  timestamps: true,
});

const Blogpost = mongoose.model("Blogpost", blogpostSchema);

module.exports = Blogpost;
