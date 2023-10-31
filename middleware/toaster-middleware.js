function toaster(req, res, next) {
    try {
        res.locals.toastMessage = req.cookies.toastMessage;

        // Clear the toastMessage cookie
        res.clearCookie("toastMessage");

        // Set a new toast message with an expiry of 5 minutes (300,000 milliseconds).
        res.setToastMessage = function (message) {
            res.cookie("toastMessage", message, {
                expires: new Date(Date.now() + 300000), 
                httpOnly: true
            });
        };

        next();
    } catch (error) {
        console.error("Error in toaster middleware:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function verifyAuthenticated(req, res, next) {
    const authToken = req.cookies.authToken;

    if (!authToken) {
        return next(); // if no token provided, move to next middleware
    }

    const user = await datahandling.findUserByAuthToken(authToken);

    if (!user) {
        return res.status(401).json({ error: 'Invalid token.' });
    }

    res.locals.user = user; // Now the user is available in other routes
    next();
}

module.exports = { toaster, verifyAuthenticated };