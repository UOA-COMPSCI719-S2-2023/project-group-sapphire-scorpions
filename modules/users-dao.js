const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

/**
 * Inserts the given user into the database. Then, reads the ID which the database auto-assigned, and adds it
 * to the user.
 * 
 * @param user the user to insert
 */
async function createUser(user) {
    const db = await dbPromise;

    const result = await db.run(SQL`
        insert into users (username, password, name) values(${user.username}, ${user.password}, ${user.name})`);
        // need to insert avata and ${user, avatar} when ready


    // Get the auto-generated ID value, and assign it back to the user object.
    user.id = result.lastID;
}

/**
 * Gets the user with the given id from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {number} id the id of the user to get.
 */
async function retrieveUserById(id) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from users
        where id = ${id}`);

    return user;
}

/**
 * Gets the user with the given username and password from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} username the user's username
 * @param {string} password the user's password
 */
async function retrieveUserWithCredentials(username, password) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from users
        where username = ${username} and password = ${password}`);

    return user;
}

/**
 * Gets the user with the given authToken from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} authToken the user's authentication token
 */
async function retrieveUserWithAuthToken(authToken) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from users
        where authToken = ${authToken}`);

    return user;
}

/**
 * Gets the user with the given username from the database.
 * If there is no such user, undefined will be returned.
 * 
 * @param {string} username the user's username
 */
async function retrieveUserByUsername(username) {
    const db = await dbPromise;

    const user = await db.get(SQL`
        select * from users
        where username = ${username}`);

    return user;
}
async function getUserPhotos(userId) {
    const db = await dbPromise;
    const query = "SELECT photoPath, description FROM user_photos WHERE userId = ?";
    const photos = await db.all(query, [userId]);
    return photos;
}



/**
 * Gets an array of all users from the database.
 */
async function retrieveAllUsers() {
    const db = await dbPromise;

    const users = await db.all(SQL`select * from users`);

    return users;
}

// to save the users photo
async function saveUserPhoto(userId, photoPath, description) {
    const db = await dbPromise;
    const query = "INSERT INTO user_photos (userId, photoPath, description) VALUES (?, ?, ?)";
    await db.run(query, [userId, photoPath, description]);
}


/**
 * Updates the given user in the database, not including auth token
 * 
 * @param user the user to update
 */
async function updateUser(user) {
    const db = await dbPromise;

    await db.run(SQL`
        update users
        set username = ${user.username}, password = ${user.password},
            name = ${user.name}, authToken = ${user.authToken}
        where id = ${user.id}`);
}

/**
 * Deletes the user with the given id from the database.
 * 
 * @param {number} id the user's id
 */
async function deleteUser(id) {
    const db = await dbPromise;

    await db.run(SQL`
        delete from users
        where id = ${id}`);
}

// Export functions.
module.exports = {
    createUser,
    retrieveUserById,
    retrieveUserWithCredentials,
    retrieveUserWithAuthToken,
    retrieveUserByUsername,
    getUserPhotos,
    retrieveAllUsers,
    saveUserPhoto,
    updateUser,
    deleteUser
};
