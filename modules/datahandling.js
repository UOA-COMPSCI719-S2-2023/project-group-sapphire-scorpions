const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function createUser(user) {
    try {
        const db = await dbPromise;
        const result = await db.run(SQL`
            insert into UserAccount (UserName,PasswordHash,FirstName,LastName,Email,Profile,ProfilePicURL,LastLogin,CreatedAt) 
            values(${user.UserName},${user.PasswordHash},${user.FirstName},${user.LastName},${user.Email},${user.Profile},${user.ProfilePicURL},DateTime('now'),DateTime('now'))`);

        user.id = result.lastID;
        console.log(`User: ${user.FirstName} ${user.LastName}`);
        console.log(`Username: ${user.UserName}`);
        console.log(`Email: ${user.Email}`);
        console.log(`Id: ${user.id}`);
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

async function findUser(user) {
    try {
        const db = await dbPromise;
        const result = await db.get(SQL`
            select * from UserAccount where id = ${user.id} OR UserName = ${user.UserName} OR Email = ${user.Email}`);
        return result;
    } catch (error) {
        console.error("Error finding user:", error);
    }
}

async function findUserById(id) {
    try {
        const db = await dbPromise;
        const result = await db.get(SQL`
            select * from UserAccount where id = ${id}`);
        return result;
    } catch (error) {
        console.error("Error finding user by ID:", error);
    }
}

// added this as it has a AuthToken - can delete if not needed
async function findUserByAuthToken(authToken) {
    try {
        const db = await dbPromise;
        const result = await db.get(SQL`
            select * from UserAccount where authToken = ${authToken}`);
        return result;
    } catch (error) {
        console.error("Error finding user by authToken:", error);
    }
}

async function updateUserPasswordbyId(user) {
    try {
        const db = await dbPromise;
        const result = await db.run(SQL`
            update UserAccount 
            set PasswordHash = ${user.PasswordHash}
            where id = ${user.id}`);
        return result;
    } catch (error) {
        console.error("Error updating user password by ID:", error);
    }
}

async function updateUserbyId(user) {
    try {
        const db = await dbPromise;
        const result = await db.run(SQL`
            update UserAccount 
            set FirstName = ${user.FirstName},
            LastName = ${user.LastName},
            Profile = ${user.Profile},
            ProfilePicURL = ${user.ProfilePicURL}
            where id = ${user.id}`);
        return result;
    } catch (error) {
        console.error("Error updating user by ID:", error);
    }
}

async function isUsernameAvailable(username) {
    try {
        const db = await dbPromise;
        const user = await db.get(SQL`select id from UserAccount where UserName = ${username}`);
        return !user;
    } catch (error) {
        console.error("Error checking username availability:", error);
        return false;
    }
}

async function createblog(blog) {
    try {
        const db = await dbPromise;
        const result = await db.run(SQL`
            insert into blogs (Title,Content,Published,UserId,UpdatedAt,PublishedAt,CreatedAt) 
            values(${blog.Title},${blog.Content},${blog.Published},${blog.UserId},DateTime('now'),DateTime('now'),DateTime('now'))`);

        blog.id = result.lastID;
        console.log(`Blog: ${blog.Title} ${blog.Content}`);
        return result;
    } catch (error) {
        console.error("Error creating blog:", error);
    }
}

async function publishblog(blog) {
    try {
        const db = await dbPromise;
        const result = await db.run(SQL`
            update blogs 
            set Published = 1, 
            PublishedAt = DateTime('now'),
            UpdatedAt = DateTime('now')
            Where
            id = ${blog.id} 
            and UserId = ${blog.UserId}
            `);
        return result;
    } catch (error) {
        console.error("Error publishing blog:", error);
    }
}

// Export functions
module.exports = {
    createUser,
    findUser,
    findUserById,
    updateUserPasswordbyId,
    updateUserbyId,
    findUserByAuthToken,
    isUsernameAvailable,
    createblog,
    publishblog
};
