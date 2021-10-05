const router = require("express").Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Blogpost = require("../models/Blogpost.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// :information_source: Handles password encryption
const bcrypt = require("bcryptjs");

router.get("/", isLoggedIn, (req, res) => {
  Blogpost.find({ author: req.session.user._id }).then((allPosts) => {
    res.render("profile/home", { allPosts });
  });
});
/*router.get("/", isLoggedIn, (req, res) => {
  res.render("profile/home", { user: req.session.user });
});*/

router.get("/update-profile", isLoggedIn, (req, res) => {
  res.render("profile/update-profile", {
    firstname: req.session.user.firstname,
    lastname: req.session.user.lastname,
    username: req.session.user.username,
    email: req.session.user.email,
    user: req.session.user,
  });
});

router.post("/update-profile", isLoggedIn, (req, res) => {
  const { firstname, lastname, username, email } = req.body;

  User.findByIdAndUpdate(
    req.session.user._id,
    { firstname, lastname, username, email },
    { new: true }
  ).then((updatedUser) => {
    req.session.user = updatedUser;
    res.redirect("/profile/update-profile");
  });
});

router.get("/update-password", isLoggedIn, (req, res) => {
  res.render("profile/update-password");
});

router.post("/update-password", isLoggedIn, (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (oldPassword === newPassword) {
    res.render("profile/update-password", {
      errorMessage:
        "Your new password can not be your old password, please choose another one!",
    });
    return;
  }

  User.findById(req.session.user._id).then((user) => {
    const arePasswordsTheSame = bcrypt.compareSync(oldPassword, user.password);

    if (!arePasswordsTheSame) {
      return res.render("profile/update-password", {
        errorMessage: "wrong credentials",
      });
    }

    if (newPassword.length < 8 || !/\d/g.test(newPassword)) {
      return res.render("profile/update-password", {
        errorMessage:
          "Your password has to be minimum 8 characters long and must contain ast least one special character!",
      });
    }

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    const hashPassword = bcrypt.hashSync(newPassword, salt);

    User.findByIdAndUpdate(
      user._id,
      { password: hashPassword },
      { new: true }
    ).then((updatedUser) => {
      req.session.user = updatedUser;
      res.redirect("/");
    });
  });
});
module.exports = router;
