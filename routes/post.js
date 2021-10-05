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

router.get("/:id", (req, res) => {
  Blogpost.findById(req.params.id)
    .populate("author")
    .then((thePost) => {
      console.log("thePost:", thePost);
      res.render("post/single-post", { post: thePost });
    });
});

module.exports = router;
