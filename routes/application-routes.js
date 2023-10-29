const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { createUser, findUser, findUserById, updateUserbyId } = require("../modules/datahandling");


router.get("/", async function (req, res) {
    console.log("Root route accessed");
    res.render("website-home");
});

router.get("/login-signup", function (req, res) {
    res.locals.title = "Login / Signup";
    res.render("login-signup");
});

router.post('/signup', async (req, res) => {
    try {
        if (req.body.password !== req.body['password-repeat']) {
            return res.status(400).send("Passwords don't match.");
        }

        const existingUser = await findUser({ UserName: req.body.username, Email: req.body.email });
        if (existingUser) {
            return res.status(400).send("Username or email is already taken. Choose a different one.");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            UserName: req.body.username,
            Email: req.body.email,
            PasswordHash: hashedPassword
            // The other fields like FirstName, LastName, etc. will be empty initially. 
            // They can be filled out when the user edits their profile.
        };

        await createUser(user);
        res.redirect('/login-signup');
    } catch (error) {
        res.status(500).send('Error during sign-up');
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await findUser({ Email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.PasswordHash))) {
            return res.status(400).send('Invalid email or password.');
        }

        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error during login');
    }
});

router.get("/personal-blog", async function (req, res) {
    try {
        if (!req.session.userId) {
            res.redirect("/login-signup");
            return;
        }
        const user = await findUserById(req.session.userId);
        res.locals.user = user;
        res.render("personal-blog");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching profile.");
    }
});

router.get("/edit-profile", async function (req, res) {
    try {
        if (!req.session.userId) {
            res.redirect("/login-signup");
            return;
        }
        const user = await findUserById(req.session.userId);
        res.locals.user = user; // So that the edit-profile template can pre-fill the form with current data.
        res.locals.title = "Edit Profile";
        res.render("edit-profile");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching profile for editing.");
    }
});

router.post("/update-profile", async function (req, res) {
    try {
        if (!req.session.userId) {
            res.redirect("/login-signup");
            return;
        }
        const updatedData = {
            UserName: req.body.username,
            Email: req.body.email,
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            Profile: req.body.profile,
            ProfilePicURL: req.body.profilePicURL
        };

        await updateUserbyId(req.session.userId, updatedData);
        res.redirect("/personal-blog");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating profile.");
    }
});

// Explorer page Route 

router.get("/explore", async function (req, res) {
    try {
        const posts = await postDao.findAllPosts();
        res.locals.posts = posts;
        res.render("explore");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching posts.");
    }
});

// Daily Quiz Page Route
router.get("/daily-quiz", async function (req, res) {
    try {
        // Fetch quiz data from the database, if required
        // ...

        res.locals.title = "Daily Quiz"; // title for quiz page
        res.render("daily-quiz"); // Render the daily-quiz handlebars template
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching quiz data.");
    }
});

// Adding a route to show the daily quiz results
router.get("/daily-quiz-results", function (req, res) {
    // For now, this route can just render a template. 
    // Later, we might want to fetch results from the database and send them to the template.
    res.locals.title = "Daily Quiz Results";
    res.render("daily-quiz-results");
});


module.exports = router;