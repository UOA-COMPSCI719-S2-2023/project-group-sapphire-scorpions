const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPromise = sqlite.open({
    filename: "./project-database.db",
    driver: sqlite3.Database
}).then(async function (db) {
    await db.run("pragma foreign_keys=true");
    
    // Create UserAccount table if it doesn't exist
    await db.run(`
        CREATE TABLE IF NOT EXISTS UserAccount (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            UserName TEXT UNIQUE NOT NULL,
            PasswordHash TEXT NOT NULL,
            FirstName TEXT NOT NULL,
            LastName TEXT NOT NULL,
            Email TEXT UNIQUE NOT NULL,
            Profile TEXT,
            ProfilePicURL TEXT,
            LastLogin DATETIME,
            CreatedAt DATETIME
        );
    `);
    
    return db;
});

module.exports = dbPromise;
