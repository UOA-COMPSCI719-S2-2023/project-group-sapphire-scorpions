const express = require("express");
const fs = require('fs');
const multer = require('multer');
const userDao = require('../modules/users-dao');
const router = express.Router();
const path = require('path');

// // multer storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads/')  // this is the directory where files will be temporarily saved
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)  // Use the original file name
//     }
// });
// const uploader = multer({ storage: storage });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        const originalFileName = file.originalname;
        let filename = originalFileName;
        let count = 1;

        while (fs.existsSync(path.join('./public/uploads/', filename))) {
            const ext = path.extname(originalFileName);
            filename = path.basename(originalFileName, ext) + `_${count}` + ext;
            count++;
        }

        cb(null, filename);
    }
});
const uploader = multer({ storage: storage });





const { verifyAuthenticated } = require("../middleware/auth-middleware.js");

// Whenever we navigate to /, verify that we're authenticated. If we are, render the home view.
const messagesDao = require("../modules/messages-dao.js");
const usersDao = require("../modules/users-dao.js");

// Default landing page
router.get("/", function (req, res) {
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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

router.post("/uploadPhoto", uploader.single("imageFile"), async (req, res) => {
    try {
        const fileInfo = req.file;

        if (!fileInfo) {
            return res.json({ success: false, message: "File upload failed!" });
        }

        // Access the caption
        const caption = req.body.caption;

        // Ensure the temporary file exists
        const oldFileName = fileInfo.path;

        await delay(1000); 

        if (!fs.existsSync(oldFileName)) {
            console.error("Temporary file not found:", oldFileName);
            return res.json({ success: false, message: "Temporary file not found." });
        }

        // Specify the new file path
        const newFileName = path.join(__dirname, 'public', 'uploads', fileInfo.originalname);

        // Move the file
        // fs.rename(oldFileName, newFileName, (err) => {
        //     if (err) {
        //         console.error("Error renaming the file:", err);
        //         return res.json({ success: false, message: "Error renaming the file." });
        //     }
        //     console.log("Uploaded with caption:", caption);

        //     // Send a success response after the file is renamed
        //     res.json({ success: true, message: "File uploaded successfully!" });
        // });
        console.log("Old File Name:", oldFileName);
        console.log("New File Name:", newFileName);

        fs.rename(oldFileName, newFileName, (err) => {
            if (err) {
                console.error("Error renaming the file:", err);
                return res.json({ success: false, message: "Error renaming the file." });
            }
            console.log("Uploaded with caption:", caption);

            // Send a success response after the file is renamed
            res.json({ success: true, message: "File uploaded successfully!" });
        });


    } catch (error) {
        console.error("Error processing the uploaded photo:", error);
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
router.get("/explore", verifyAuthenticated, function (req, res) {
    res.render("explore");
});

//Daily quiz route
router.get("/daily-quiz", verifyAuthenticated, function (req, res) {
    res.render("daily-quiz");
});


module.exports = router;