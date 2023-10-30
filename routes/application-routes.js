const express = require("express");
const router = express.Router();
const datahandling = require("../modules/datahandling.js");
const { verifyAuthenticated } = require("./middleware/auth-middleware.js");

router.get("/", async function (req, res) {
    console.log("Root route accessed");
    res.render("website-home");
});

router.get("/login-signup", function (req, res) {
    res.render("login-signup");
});

router.get("/personal-blog", verifyAuthenticated, async function (req, res) {
    const user = await datahandling.findUserById(req.session.userId);
    res.locals.user = user;
    res.render("personal-blog");
});

router.get("/edit-profile", verifyAuthenticated, async function (req, res) {
    const user = await datahandling.findUserById(req.session.userId);
    res.locals.user = user; 
    res.locals.title = "Edit Profile";
    res.render("edit-profile");
});

router.post("/update-profile", verifyAuthenticated, async function (req, res) {
    const updatedData = {
        UserName: req.body.username,
        Email: req.body.email,
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Profile: req.body.profile,
        ProfilePicURL: req.body.profilePicURL
    };

    await datahandling.updateUserbyId(req.session.userId, updatedData);
    res.redirect("/personal-blog");
});

// Explorer page Route 
router.get("/explore", verifyAuthenticated, async function (req, res) {
    const posts = await datahandling.findAllPosts(); // Assuming you have this function in your datahandling
    res.locals.posts = posts;
    res.render("explore");
});

// Daily Quiz Page Route
router.get("/daily-quiz", verifyAuthenticated, async function (req, res) {
    res.locals.title = "Daily Quiz";
    res.render("daily-quiz");
});

// Adding a route to show the daily quiz results
router.get("/daily-quiz-results", verifyAuthenticated, function (req, res) {
    res.locals.title = "Daily Quiz Results";
    res.render("daily-quiz-results");
});

module.exports = router;
