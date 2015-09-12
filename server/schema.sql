DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  message_id MEDIUMINT NOT NULL AUTO_INCREMENT,
  message_text varchar(500),
  user_id MEDIUMINT NOT NULL REFERENCES users(user_id),
  roomname varchar(20),
  PRIMARY KEY (message_id)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  user_id MEDIUMINT NOT NULL AUTO_INCREMENT,
  username varchar(20),
  PRIMARY KEY (user_id)
);

-- INSERT INTO messages (
--   message_id,
--   message_text,
--   user_id,
--   roomname
-- )
-- VALUES (
--   1,
--   'hello',
--   2,
--   'lobby'
-- );

-- INSERT INTO users (
--   user_id,
--   username
-- )
-- VALUES (
--   2,
--   'joyce'
-- );



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

