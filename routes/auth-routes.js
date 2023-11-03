const { v4: uuid } = require("uuid");
const express = require("express");
const router = express.Router();
const userDao = require("../modules/users-dao.js");

// Whenever we navigate to /login, if we're already logged in, redirect to "/".
// Otherwise, render the "login" view.
router.get("/login", function (req, res) {

    if (res.locals.user) {
        res.redirect("/");
    }

    else {
        res.render("login");
    }

});

// Whenever we POST to /login, check the username and password submitted by the user.
// If they match a user in the database, give that user an authToken, save the authToken
// in a cookie, and redirect to "/". Otherwise, redirect to "/login", with a "login failed" message.
router.post("/login", async function (req, res) {

    // Get the username and password submitted in the form
    const username = req.body.username;
    const password = req.body.password;

    // Find a matching user in the database
    const user = await userDao.retrieveUserWithCredentials(username, password);

    // if there is a matching user...
    if (user) {
        // Auth success - give that user an authToken, save the token in a cookie, and redirect to the homepage.
        const authToken = uuid();
        user.authToken = authToken;
        await userDao.updateUser(user);
        res.cookie("authToken", authToken);
        res.locals.user = user;
        res.redirect("/");
    }

    // Otherwise, if there's no matching user...
    else {
        // Auth fail
        res.locals.user = null;
        res.setToastMessage("Authentication failed!");
        res.redirect("./login");
    }
});

// Whenever we navigate to /logout, delete the authToken cookie.
// redirect to "/login", supplying a "logged out successfully" message.
router.get("/logout", function (req, res) {
    res.clearCookie("authToken");
    res.locals.user = null;
    res.setToastMessage("Successfully logged out!");
    res.redirect("./");
});

// Account creation
router.get("/newAccount", function (req, res) {
    res.render("new-account");
})

router.post("/newAccount", async function (req, res) {

    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword; 
    const name = req.body.name;
    const dob = req.body.dob;  // <-- Retrieve the date of birth from the request
    const description = req.body.description;  // <-- Retrieve the description from the request
    //const avatar = req.body.avatar; 

    // Check if passwords match
    if (password !== confirmPassword) {
        res.setToastMessage("Passwords do not match!");
        return res.redirect("/newAccount"); 
    }

    const user = {
        username: username,
        password: password,
        name: name,
        dob: dob, 
        description: description 
        //avatar: avatar 
    };

    try {
        await userDao.createUser(user);
        res.setToastMessage("Account creation successful. Please login using your new credentials.");
        res.redirect("/login");
    }
    catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
            res.setToastMessage("That username was already taken!");
        } else {
            res.setToastMessage("An error occurred. Please try again."); 
        }
        res.redirect("/newAccount");
    }
});


module.exports = router;