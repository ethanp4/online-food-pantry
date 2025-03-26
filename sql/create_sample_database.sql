CREATE DATABASE food;
USE food;
CREATE TABLE food_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  max_per_person INT NOT NULL DEFAULT -1,
  count INT NOT NULL
);
INSERT INTO food_items (name, count) VALUES
('Apple', 10),
('Banana', 5),
('Orange', 15),
('5 kg of flour', 20);
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
  type ENUM('user', 'admin') NOT NULL
);
INSERT INTO users (username, hashedPassword, type) VALUES
('username', '$2b$10$WVBzi4brA.79ESPwORme2em0VVWKjPtjVKTpYgYZpm5mMC/iLIa7W', 'user'),
('admin', '$2b$10$WVBzi4brA.79ESPwORme2em0VVWKjPtjVKTpYgYZpm5mMC/iLIa7W', 'admin'); 
CREATE TABLE user_profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),

  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  address VARCHAR(255) NOT NULL,
  region ENUM('NW', 'NE', 'SW', 'SE') NOT NULL, 
  country_of_origin VARCHAR(255) NOT NULL,
  spoken_language VARCHAR(255) NOT NULL,
  referrer VARCHAR(255) NOT NULL 
);
INSERT INTO user_profiles VALUES
(1, 1, 'John', 'Doe', 'johndoe@gmail.com', '555-555-5555', '126 Address St', 'NW', 'Bulgaria', 'Bulgarian', 'Bulgarian Govt'),
(2, 2, 'Jane', 'Admin-Doe', 'janedoe@gmail.com', '555-555-5555', '127 Address St', 'NW', 'France', 'French', 'France Govt');
SELECT u.username, p.*
FROM users AS u
JOIN user_profiles AS p ON p.user_id = u.id
WHERE u.id = 1;
