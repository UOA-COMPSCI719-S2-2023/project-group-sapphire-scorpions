const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function createUser(user) {

    const db = await dbPromise;
    const result = await db.run(SQL`
        insert into UserAccount (UserName,PasswordHash,FirstName,LastName,Email,Profile,ProfilePicURL,LastLogin,CreatedAt) 
        values(${user.UserName},${user.PasswordHash},${user.FirstName},${user.LastName},${user.Email},${user.Profile},${user.ProfilePicURL},DateTime('now'),DateTime('now'))`);

    user.id = result.lastID;
    console.log(`User: ${user.FirstName} ${user.LastName}`);
    console.log(`username: ${user.UserName}`);
    console.log(`Email: ${user.Email}`);
    console.log(`Id: ${user.id}`);
    return(result);
}


async function findUser(user) {
    const db = await dbPromise;
    const result = await db.get(SQL`
        select * from UserAccount where id = ${user.id} OR UserName = ${user.UserName} OR Email = ${user.Email}`);
    return result;
}

async function findUserById(id) {
    const db = await dbPromise;
    const result = await db.get(SQL`
        select * from UserAccount where id = ${id}`);
    return result;
}

async function updateUserPasswordbyId(user) {
    const db = await dbPromise;
    const result = await db.run(SQL`
        update UserAccount 
        set PasswordHash = ${user.PasswordHash},
        where id = ${user.id}`);
    return result;
}

async function updateUserbyId(user) {
    const db = await dbPromise;
    const result = await db.run(SQL`
        update UserAccount 
        set FisrtName = ${user.FirstName},
        LastName = ${user.LastName},
        Profile = ${user.Profile},
        ProfilePicURL = ${user.ProfilePicURL}
        where id = ${user.id}`);
    return result;
}


async function retrieveTestDataById(id) {
    const db = await dbPromise;

    const testData = await db.get(SQL`
        select * from test
        where id = ${id}`);

    return testData;
}

async function retrieveAllTestData() {
    const db = await dbPromise;

    const allTestData = await db.all(SQL`select * from test`);

    return allTestData;
}

async function updateTestData(testData) {
    const db = await dbPromise;

    return await db.run(SQL`
        update test
        set stuff = ${testData.stuff}
        where id = ${testData.id}`);
}

async function deleteTestData(id) {
    const db = await dbPromise;

    return await db.run(SQL`
        delete from test
        where id = ${id}`);
}

// Export functions.
module.exports = {
    createUser,
    findUser,
    findUserById,
    updateUserPasswordbyId,
    updateUserbyId,
    deleteTestData
};
