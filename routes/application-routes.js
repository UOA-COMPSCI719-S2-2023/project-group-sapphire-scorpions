const express = require("express");
const fs = require('fs');
const multer = require('multer');
const userDao = require('../modules/users-dao');
const router = express.Router();

// multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')  // this is the directory where files will be temporarily saved
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)  // Use the original file name
    }
});
const uploader = multer({ storage: storage });


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
    try {
        // Fetch the messages
        const messages = await messagesDao.retrieveMessagesReceivedBy(user.id);
        res.locals.messages = messages;

        // Fetch the user's photos
        const photos = await userDao.getUserPhotos(user.id);
        res.locals.photos = photos;

        // Render the home (blog) page
        res.render("home");
    } catch (error) {
        console.error('Error fetching data for home page:', error);
        res.locals.error = 'There was an error fetching data. Please try again later.';
        res.render("home");
    }
});


// uploading and image and updating it on the blog page

router.post("/uploadPhoto", uploader.single("blogPhoto"), async (req, res) => {
    const fileInfo = req.file;
    if (!fileInfo) {
        res.locals.photoUploadMessage = "File upload failed!";
        return res.redirect('/'); 
    }

    // Move the file from temporary storage to a more permanent location
    const oldFileName = fileInfo.path;
    const newFileName = `./public/uploads/${fileInfo.originalname}`;
    fs.renameSync(oldFileName, newFileName);

    // Store the reference to this file in the database
    const userId = res.locals.user.id;
    const photoPath = newFileName;  // now the path includes the original file name
    const description = req.body.blogContent;

    try {
        await userDao.saveUserPhoto(userId, photoPath, description);
        res.locals.photoUploadMessage = "Photo uploaded successfully!";
    } catch (error) {
        console.error(error);
        res.locals.photoUploadMessage = "There was an error uploading the photo.";
    }

    res.redirect('/');  // redirect to home or any appropriate page after upload
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