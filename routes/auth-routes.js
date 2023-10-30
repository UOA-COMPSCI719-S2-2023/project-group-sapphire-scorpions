const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { createUser, findUser } = require('../modules/datahandling.js');
const session = require('express-session');

// Initializing session
router.use(session({
    secret: 'someSecretKey', // This should be kept secret
    resave: false,
    saveUninitialized: true
}));

router.get("/login-signup", function (req, res) {
    res.locals.title = "Login / Signup";
    res.render("login-signup");
});

router.post('/signup', async (req, res) => {
    try {
        if (req.body.password !== req.body['password-repeat']) {
            return res.status(400).json({ error: "Passwords don't match." });
        }

        const existingUser = await findUser({ UserName: req.body.username, Email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "Username or email is already taken. Choose a different one." });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            UserName: req.body.username,
            Email: req.body.email,
            FirstName: req.body.firstname,
            LastName: req.body.lastname,
            PasswordHash: hashedPassword
        };

        await createUser(user);
        res.json({ success: true, message: "User signed up successfully." });

    } catch (error) {
        res.status(500).json({ error: 'Error during sign-up' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await findUser({ UserName: req.body.username });
        if (!user || !(await bcrypt.compare(req.body.password, user.PasswordHash))) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        req.session.userId = user.id; // Storing user's ID in the session
        res.json({ success: true, redirect: "/personal-blog" });

    } catch (error) {
        res.status(500).json({ error: 'Error during login' });
    }
});

module.exports = router;
