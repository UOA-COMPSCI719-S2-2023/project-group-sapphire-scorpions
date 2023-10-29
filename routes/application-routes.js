const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
    console.log("Root route accessed");
    res.render("website-home");
});

//Sign-up and login functions

router.get("/login-signup", function (req, res) {
    res.locals.title = "Login / Signup";
    res.render("login-signup");
});

router.post('/signup', async (req, res) => {
    try {
        // Check if the password and repeat password are the same
        if (req.body.password !== req.body['password-repeat']) {
            return res.status(400).send("Passwords don't match.");
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).send("Username is already taken. Choose a different one.");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();

        res.redirect('/login-signup');

    } catch (error) {
        res.status(500).send('Error during sign-up');
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(400).send('Invalid email or password.');
        }

        // Here, we would set up session or JWT for authentication
        // For simplicity, let's just redirect to home
        res.redirect('/');

    } catch (error) {
        res.status(500).send('Error during login');
    }
});

module.exports = router;


// Personal Blog / Profile Page Route: This is for displaying and updating the user's profile:

router.get("/personal-blog", async function (req, res) {
    try {
        // Ensure the user is logged in
        if (!req.session.userId) {
            res.redirect("/login-signup");
            return;
        }

        const user = await userDao.findById(req.session.userId);
        // Fetch additional user data as required, e.g., posts, images

        res.locals.user = user;
        res.render("personal-blog");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching profile.");
    }
});

router.post("/update-profile", async function (req, res) {
    try {
        // Update user's details, photos, and posts

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

        res.locals.title = "Daily Quiz"; // Set a title for your quiz page
        res.render("daily-quiz"); // Render the daily-quiz handlebars template
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching quiz data.");
    }
});



module.exports = router;