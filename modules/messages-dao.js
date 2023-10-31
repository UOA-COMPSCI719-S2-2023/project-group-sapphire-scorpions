const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function createMessage(senderId, receiverId, content) {
    const db = await dbPromise;

    await db.run(SQL`
        insert into messages (senderId, receiverId, content, timestamp)
        values(${senderId}, ${receiverId}, ${content}, datetime('now'))`);

}

async function retrieveMessagesReceivedBy(userId) {
    const db = await dbPromise;

    const messages = await db.all(SQL`
        select m.timestamp as 'timestamp', m.content as 'content', s.username as 'senderUsername'
        from messages m, users s
        where m.receiverId = ${userId}
        and m.senderId = s.id
        order by m.timestamp desc`);

    return messages;
}

async function deleteMessage(id) {
    const db = await dbPromise;

    await db.run(SQL`
        delete from messages
        where id = ${id}`);
}

// Export functions.
module.exports = {
    createMessage,
    retrieveMessagesReceivedBy,
    deleteMessage
};
