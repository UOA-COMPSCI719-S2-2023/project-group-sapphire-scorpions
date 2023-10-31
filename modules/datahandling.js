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


async function createblog(blog) {

    const db = await dbPromise;
    const result = await db.run(SQL`
        insert into blogs (Title,Content,Published,UserId,UpdatedAt,PublishedAt,CreatedAt) 
        values(${blog.Title},${blog.Content},${blog.Published},${blog.UserId},DateTime('now'),null,DateTime('now'))`);

    blog.id = result.lastID;
    console.log(`Blog: ${blog.Title} ${blog.Content}`);
    return result;
}

async function publishblog(blog) {

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
}

async function createblog_comment(blog_comment) {

    const db = await dbPromise;
    const result = await db.run(SQL`
        insert into blogs_comments (Title,Content,Published,UpdatedAt,PublishedAt,CreatedAt,blogId) 
        values(${blog_comment.Title},${blog_comment.Content},${blog_comment.Published},DateTime('now'),null,DateTime('now'),${blog_comment.blogId})`);

    blog_comment.id = result.lastID;
    console.log(`Blog_comment created: ${blog_comment.Title} ${blog_comment.Content}`);
    return result;
}

async function createblog_meta(blog_meta) {

    const db = await dbPromise;
    const result = await db.run(SQL`
        insert into blogs_meta (Content,blogImgURL,UpdatedAt,CreatedAt,blogId) 
        values(${blog_meta.Content},${blog_meta.blogImgURL},DateTime('now'),DateTime('now'),${blog_meta.blogId})`);

        blog_meta.id = result.lastID;
    console.log(`blog_meta created: ${blog_meta.Content}`);
    return result;
}

async function updateblog(blog) {

    const db = await dbPromise;
    const result = await db.run(SQL`
        update blogs 
        set Content = ${blog.Content},
        Title = ${blog.Title},
        UpdatedAt = DateTime('now')
        Where
        id = ${blog.id} 
        and UserId = ${blog.UserId}
        `);

    return result;
}

async function updateblog_comment(blog_comment) {

    const db = await dbPromise;
    const result = await db.run(SQL`
        update blogs_comments 
        set Title = ${blog_comment.Title},
        Content = ${blog_comment.Content},
        UpdatedAt = DateTime('now')
        Where
        id = ${blog_comment.id}
        and
        blogId = ${blog_comment.blogId}
        `);
    return result;
}

async function updateblog_meta(blog_meta) {

    const db = await dbPromise;
    const result = await db.run(SQL`
        update blogs_meta 
        set
        Content = ${blog_meta.Content},
        blogImgURL = ${blog_meta.blogImgURL},
        UpdatedAt = DateTime('now')
        Where
        id = ${blog_meta.id}
        and
        blogId = ${blog_meta.blogId}
        `);
    return result;
}

async function getallblogs() {

    const db = await dbPromise;
    var blogs = [];
    blogs = await db.all(SQL`select * from blogs`);
    var blogs_comments = [];
    blogs_comments = await db.all(SQL`select * from blogs_comments`);
    var blogs_meta = [];
    blogs_meta = await db.all(SQL`select * from blogs_meta`);
    const result = {};

    for (const blog of blogs) {
        const blog_id = blog.id;
        result[blog_id] = {
            id: blog.id,
            Title: blog.Title, 
            Content: blog.Content,
            Published: blog.Published,
            UserId: blog.UserId,
            UpdatedAt: blog.UpdatedAt,
            PublishedAt: blog.PublishedAt,
            CreatedAt: blog.CreatedAt,
            blog_comments: [],
            blog_meta: []
        };
    }
    
    for (const blog_comment of blogs_comments) {
        const blog_id = blog_comment.blogId;
        if (result[blog_id]) {
            result[blog_id].blog_comments.push({
                id: blog_comment.id,
                Title: blog_comment.Title,
                Content: blog_comment.Content,
                Published: blog_comment.Published,
                UpdatedAt: blog_comment.UpdatedAt,
                PublishedAt: blog_comment.PublishedAt,
                CreatedAt: blog_comment.CreatedAt,
                blogId: blog_comment.blogId
            });
        }
    }

    for (const blog_meta of blogs_meta) {
        const blog_id = blog_meta.blogId;
        if (result[blog_id]) {
            result[blog_id].blog_meta.push({
                id: blog_meta.id,
                Content: blog_meta.Content,
                blogImgURL: blog_meta.blogImgURL,
                UpdatedAt: blog_meta.UpdatedAt,
                CreatedAt: blog_meta.CreatedAt,
                blogId: blog_meta.blogId
            });
        }
    }
    //const stringresult = JSON.stringify(result);
    return result;
}

//async function deleteTestData(id) {
//    const db = await dbPromise;
//
//    return await db.run(SQL`
//        delete from test
//        where id = ${id}`);
//}

// Export functions.
module.exports = {
    createUser,
    findUser,
    findUserById,
    updateUserPasswordbyId,
    updateUserbyId,
    createblog,
    publishblog,
    createblog_comment,
    createblog_meta,
    updateblog,
    updateblog_comment,
    updateblog_meta,
    getallblogs

};
