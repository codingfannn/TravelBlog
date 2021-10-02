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
  res.render("profile/home");
});

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

module.exports = router;
