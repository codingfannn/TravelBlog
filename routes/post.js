const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const { rawListeners } = require("../models/Blogpost.model");
const Blogpost = require("../models/Blogpost.model");
const upload = require("../middleware/cloudinary");

router.get("/create", isLoggedIn, (req, res) => {
  res.render("post/post-create");
});

router.post("/create", isLoggedIn, upload.single("image"), (req, res) => {
  console.log(req.file);
  console.log("req.body:", req.body);
  const { title, text, startVacation, endVacation, timestamps } = req.body;

  Blogpost.create({
    text,
    title,
    startVacation,
    endVacation,
    timestamps,
    author: req.session.user._id,
    image: req.file.path,
  }).then((createdPost) => {
    console.log(createdPost);
    res.redirect("/post/all-posts");
  });
});

router.get("/all-posts", (req, res) => {
  Blogpost.find().then((allPosts) => {
    res.render("post/all-posts", { allPosts });
  });
});

router.get("/:id", (req, res) => {
  Blogpost.findById(req.params.id)
    .populate("author")
    .then((thePost) => {
      console.log("thePost:", thePost);
      //Check if is author then showing the edit button
      let isAuthor = false;
      if (req.session.user) {
        if (req.session.user._id.toString() === thePost.author._id.toString()) {
          isAuthor = true;
        }
      }
      res.render("post/single-post", { post: thePost, isAuthor });
    });
});

router.get("/:id/edit", isLoggedIn, (req, res) => {
  Blogpost.findById(req.params.id).then((thePost) => {
    //If not the author of post then back to the post page
    if (req.session.user._id.toString() !== thePost.author._id.toString()) {
      return res.redirect(`/post/${thePost.id}`);
    }
    res.render("post/edit-single-post", { post: thePost });
  });
});

router.post("/:id/edit", isLoggedIn, upload.single("image"), (req, res) => {
  const { startVacation, endVacation, title, image, text } = req.body;
  //Check if the post is exist
  Blogpost.findById(req.params.id).then((singlePost) => {
    console.log("singlePost:", singlePost);
    if (!singlePost) {
      return res.redirect("/");
    }

    //If not the author of post then back to the post page
    if (req.session.user._id.toString() !== singlePost.author._id.toString()) {
      return res.redirect(`/post/${singlePost._id}`);
    }

    Blogpost.findByIdAndUpdate(singlePost._id, {
      startVacation,
      endVacation,
      title,
      image: req.file.path,
      text,
    }).then(() => {
      res.redirect(`/post/${singlePost._id}`);
    });
  });
});

router.post("/:id/delete", isLoggedIn, (req, res) => {
  Blogpost.findByIdAndDelete(req.params.id)
    .then((deletePost) => {
      res.redirect("/post/all-posts");
    })
    .catch((error) => {
      console.log("arr!!");
    });
});

module.exports = router;
