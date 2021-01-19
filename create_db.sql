DROP DATABASE chatter;
CREATE DATABASE chatter;
USE chatter;
CREATE TABLE user (id int(255) NOT NULL AUTO_INCREMENT, username varchar(255) UNIQUE NOT NULL, password varchar(255) NOT NULL, salt int(255) NOT NULL, last_online timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id)) ENGINE = InnoDB;
CREATE TABLE chat_room (id int(255) NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, pin varchar(255), salt int(255), PRIMARY KEY (id)) ENGINE = InnoDB;
CREATE TABLE chat_user (user_id int(255) NOT NULL, chat_room_id int(255) NOT NULL, privileges tinyint(1) NOT NULL DEFAULT 0, FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (chat_room_id) REFERENCES chat_room (id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE = InnoDB;
CREATE TABLE message (id int(255) NOT NULL AUTO_INCREMENT, owner_id int(255) NOT NULL, chat_room_id int(255) NOT NULL, message_text text NOT NULL, time_stamp timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (owner_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (chat_room_id) REFERENCES chat_room (id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE = InnoDB;
CREATE TABLE attachment (id int(255) NOT NULL AUTO_INCREMENT, message_id int(255) NOT NULL, path varchar(255) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (message_id) REFERENCES message (id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE = InnoDB;
