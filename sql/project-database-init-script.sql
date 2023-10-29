/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

drop table if exists test;

create table test (
    id integer not null primary key,
    stuff text  
);

insert into test (stuff) values
    ('Things'),
    ('More things'),
    ('One More Thing');

drop table if exists UserAccount;
create table UserAccount (
	id integer not null primary key,
	UserName text not null,
	PasswordHash text not null,
	FirstName text not null,
	LastName text not null,
	Email text not null,
	Profile text,
	ProfilePicURL text,
	LastLogin text,
	CreatedAt text
);

drop table if exists blogs;
create table blogs (
	id integer not null primary key,
	Title text,
	Content text,
	Published integer,
	UpdatedAt text,
	PublishedAt text,
	CreatedAt text,
    UserId integer not null,
	FOREIGN KEY (UserId)
       REFERENCES UserAccount (id)
);

drop table if exists blogs_meta;
create table blogs_meta (
	id integer not null primary key,
	Content text,
	blogImgURL text,
	UpdatedAt text,
	CreatedAt text,
    blogId integer not null,
	FOREIGN KEY (blogId)
       REFERENCES blogs (id)
);

drop table if exists blogs_comments;
create table blogs_comments (
	id integer not null primary key,
	Title text,
	Content text,
	Published integer,
	UpdatedAt text,
	PublishedAt text,
	CreatedAt text,
    blogId integer not null,
	FOREIGN KEY (blogId)
       REFERENCES blogs (id)
);


INSERT INTO UserAccount(UserName,PasswordHash,FirstName,LastName,Email,Profile,ProfilePicURL,LastLogin,CreatedAt) 
VALUES ('test','test','FirstName','LastName','test\@test.com','Hi Its test account','images/placeholderimg.png',DateTime('now'),DateTime('now'));

INSERT INTO blogs(UserId,Title,Content,Published,UpdatedAt,PublishedAt,CreatedAt)
VALUES (1,'Dummy Title','Dummy Content',1,DateTime('now'),DateTime('now'),DateTime('now'));

