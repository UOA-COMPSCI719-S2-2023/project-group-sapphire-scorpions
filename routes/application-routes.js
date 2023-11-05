const express = require("express");
const fs = require('fs');
const multer = require('multer');
const userDao = require('../modules/users-dao');
const router = express.Router();
const path = require('path'); 

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


// uploading an image, blog content and updating it on the blog page

router.post("/uploadPhoto", verifyAuthenticated, uploader.single("imageFile"), async (req, res) => {
    const user = res.locals.user;
    const fileInfo = req.file;

    if (!fileInfo) {
        return res.json({ success: false, message: "File upload failed!" });
    }

    // Access the caption
    const caption = req.body.caption;

    //Access the blogContent
    const blogContentConst = req.body.blogContent;

    // Move the file from temporary storage to a more permanent location
    const oldFileName = fileInfo.path;

    // static location since we are using middleware to serve images from public folder
    const newFileStaticLocation = path.join('uploads', fileInfo.originalname)

    // actual location we want to save the image to
    const newFileLocation = path.join('public', newFileStaticLocation);

    try {
        fs.renameSync(oldFileName, newFileLocation);
        usersDao.saveUserPhoto(user.id,newFileStaticLocation,caption,blogContentConst);
        console.log("Uploaded with caption:", caption);

        // Send a success response after the file is renamed
        res.json({ success: true, message: "File uploaded successfully!" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "There was an error processing the uploaded photo." });
    }
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
router.get("/explore", async (req, res) => {
    try {
        const photos = await usersDao.getAllPhotos();
        res.render("explore", { photos: photos });
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).send("An error occurred while trying to display the explore page.");
    }
});


//Daily quiz route
router.get("/daily-quiz", verifyAuthenticated, function (req, res) {
    res.render("daily-quiz");
});

router.post("/removeImage", verifyAuthenticated, (req, res) => {
    const imageSrc = req.body.imageSrc; // Get the image source URL from the request

    // Perform the logic to remove the image and caption from the database or file system
    // You may use the URL to identify the image to be removed

    // Respond with a success message or an error message
    res.json({ success: true, message: "Image and caption removed successfully" });
    // or
    // res.json({ success: false, message: "An error occurred while removing the image" });
});

router.get('/website-home', (req, res) => {
    res.render('website-home'); // This will render the 'website-home.handlebars' template.
});

router.post('/deleteAccount', verifyAuthenticated, async (req, res) => {
    const userId = res.locals.user.id;

    try {
        await usersDao.deleteUser(userId);

        // After successfully deleting the user account, redirect to the logout route
        console.log('Account successfully deleted. Logging out.');
        res.redirect('/logout'); // This will clear the cookie and redirect to the home page.
    } catch (error) {
        console.error('Error during account deletion:', error);
        res.status(500).send('There was an error deleting the account.');
    }
});


module.exports = router;