const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer-uploader.js');


const { verifyAuthenticated } = require("../middleware/auth-middleware.js");

// Whenever we navigate to /, verify that we're authenticated. If we are, render the home view.
const messagesDao = require("../modules/messages-dao.js");
const usersDao = require("../modules/users-dao.js");

// Default landing page
router.get("/", function(req, res) {
    if (res.locals.user) {  // Check if user is authenticated
        res.redirect("/home");  // Redirect to authenticated user's home page
    } else {
        res.render("website-home");  // Render website homepage for unauthenticated users
    }
});

// Whenever we navigate to /home, verify that we're authenticated. If we are, render the home view.
router.get("/home", verifyAuthenticated, async function (req, res) {

    const user = res.locals.user;
    const messages = await messagesDao.retrieveMessagesReceivedBy(user.id);
    res.locals.messages = messages;
    // need to add a fetch function to retrieve the users avatar 

    res.render("home");
});

router.post("/uploadPhoto", verifyAuthenticated, upload.single('blogPhoto'), async (req, res) => {
    try {
        // Get the path of the uploaded file
        const filePath = req.file.path;

        // Get the photo description
        const photoDescription = req.body.photoDescription; 

        // Get the authenticated user's ID
        const userId = res.locals.user.id;

        // Update the database with the filePath and the photoDescription.
        // Adjusted the hypothetical function to saveUserPhoto to handle description as well.
        await photosDao.saveUserPhoto(userId, filePath, photoDescription);
        
        res.locals.photoUploadMessage = "Photo uploaded successfully!";
    } catch (error) {
        console.error("Error uploading photo:", error);
        res.locals.photoUploadMessage = "There was an error uploading your photo. Please try again.";
    }

    res.redirect("/home");
});


// Whenever we POST to /sendMessage, verify that we're authenticated. If we are,
// add a new message to the database (specified by the form submission)
router.post("/sendMessage", verifyAuthenticated, async function (req, res) {

    const sender = res.locals.user;
    const receiver = await usersDao.retrieveUserByUsername(req.body.receiver);

    if (receiver) {

        await messagesDao.createMessage(sender.id, receiver.id, req.body.content);
        res.setToastMessage("Message sent!");
    }

    else {
        res.setToastMessage("A user with that username doesn't exist!");
    }

    res.redirect("/home");
});

//Explorer route:
router.get("/explore", verifyAuthenticated, function (req, res) {
    res.render("explore");
});

//Daily quiz route
router.get("/daily-quiz", verifyAuthenticated, function (req, res) {
    res.render("daily-quiz");
});


module.exports = router;