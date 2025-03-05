DROP DATABASE IF EXISTS food;
CREATE DATABASE food;
USE food;
CREATE TABLE food_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  max_per_person INT NOT NULL DEFAULT -1,
  count INT NOT NULL
);
--strictly login related information
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
  type ENUM('user', 'admin') NOT NULL
);
--contains extra personal information and a foreign key to their login in 'users'
CREATE TABLE user_profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),

  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  address VARCHAR(255) NOT NULL,
  region ENUM('NW', 'NE', 'SW', 'SE') NOT NULL, 
  country_of_origin VARCHAR(255) NOT NULL,
  spoken_language VARCHAR(255) NOT NULL,
  referrer VARCHAR(255) NOT NULL 
);
INSERT INTO food_items (name, count) VALUES
('Apple', 10),
('Banana', 5),
('Orange', 15),
('5 kg of flour', 20);

-- SELECT * FROM food_items;
-- SELECT * FROM users;
