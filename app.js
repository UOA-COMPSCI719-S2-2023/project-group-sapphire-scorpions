// Setup Express
const express = require("express");
const app = express();
const port = 3000;

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars.engine({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Setup body-parser
app.use(express.urlencoded({ extended: false }));

// Setup cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Make the "public" folder available statically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Setup our middleware
const { toaster } = require("./middleware/toaster-middleware.js");
app.use(toaster);
const { addUserToLocals } = require("./middleware/auth-middleware.js");
app.use(addUserToLocals);

// Setup our routes
const authRouter = require("./routes/auth-routes.js");
app.use(authRouter);

//Direcotry to upload photos:
//app.use('/uploads', express.static('path_to_your_uploads_directory'));


const appRouter = require("./routes/application-routes.js");
app.use(appRouter);

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});