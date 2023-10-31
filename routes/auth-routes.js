const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuid } = require("uuid");
const router = express.Router();
const datahandling = require('../modules/datahandling.js');
const {toaster} = require('../middleware/toaster-middleware.js');

router.use(toaster);

// Route for Login/Signup
router.get("/login-signup", function (req, res) {
    if (res.locals.user) {
        res.json({ success: true, message: 'Login successful.' });
    } else {
        res.render("login-signup");
    }
});

// Route for Signup
router.post('/signup', async (req, res) => {
    const { password, username, email, firstname, lastname } = req.body;

    if (password !== req.body['password-repeat']) {
        res.setToastMessage("Passwords don't match.");
        return res.status(400).json({ error: "Passwords don't match." });
    }

    const existingUser = await datahandling.findUser({ UserName: req.body.username, Email: req.body.email });
    if (existingUser) {
        res.setToastMessage("Username or email is already taken. Choose a different one.");
        return res.status(400).json({ error: "Username or email is already taken. Choose a different one." });
    }

  //  const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        UserName: username,
        Email: email,
        FirstName: firstname,
        LastName: lastname,
        PasswordHash: password
    };

    try {
        await datahandling.createUser(user);
        res.setToastMessage("User signed up successfully.");
        res.json({ success: true, message: "User signed up successfully." });
    } catch (error) {
        res.setToastMessage("Error during sign-up.");
        res.status(500).json({ error: 'Error during sign-up' });
    }
});

// Route for Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await datahandling.findUser({ UserName: username });
    if (!user || !(await bcrypt.compare(password, user.PasswordHash))) {
        res.setToastMessage("Invalid username or password.");
        return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const authToken = uuid();

    // Storing the authToken in the database
    await datahandling.updateUserbyId(user.id, { authToken: authToken }); // Assuming you have an updateUserbyId function

    // Setting the authToken as a cookie
    res.cookie('authToken', authToken, { httpOnly: true }); // This makes sure JavaScript on the client side can't access this cookie

    res.redirect("/");
});


// Route for Logout (We can add this eventually)
// router.get("/logout", function (req, res) {
//     res.clearCookie("authToken");
//     res.locals.user = null;
//     res.setToastMessage("Successfully logged out!");
//     res.redirect("/login-signup");
// });

module.exports = router;
