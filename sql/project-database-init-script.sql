-- Run this script to create or re-initialize the database.

drop table if exists messages;
drop table if exists user_photos;
drop table if exists users;

create table users (

    id integer not null primary key,
    username varchar(64) unique not null,
    password varchar(64) not null,
    name varchar(64),
    dob date, 
    description varchar(256),
    avatar,
    authToken varchar(128),
    profile
);

-- creating a table for the user's photo
create table user_photos (
    id integer not null primary key,
    userId integer not null,
    photoPath varchar(256) not null,
    blogContentConst varchar(256),  -- you can adjust the size as needed
    caption VARCHAR(256),
    foreign key (userId) references users(id)
);

create table messages (

    id integer not null primary key,
    senderId integer not null,
    receiverId integer not null,
    timestamp timestamp not null,
    content varchar(256) not null,
    foreign key (senderId) references users(id),
    foreign key (receiverId) references users(id)
);