const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const dbPromise = sqlite.open({
    filename: "./project-database.db",
    driver: sqlite3.Database
});
module.exports = dbPromise;