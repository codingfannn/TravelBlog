const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Blogpost = require("../models/Blogpost.model");

router.get("/create", isLoggedIn, (req, res) => {
  res.render("post/post-create");
});

router.post("/create", isLoggedIn, (req, res) => {
  const { title, text, startVacation, endVacation, timestamps } = req.body;

  Blogpost.create({ text, title, author: req.session.user._id }).then(
    (createdPost) => {
      console.log(createdPost);
      res.redirect("/profile");
    }
  );
});

module.exports = router;
