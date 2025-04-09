DROP DATABASE IF EXISTS food;
CREATE DATABASE food;
USE food;
CREATE TABLE food_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  max_per_person INT NOT NULL DEFAULT -1,
  count INT NOT NULL,
  dietary_preferences VARCHAR(255),
  cultural_preferences VARCHAR(255),
  food_type VARCHAR(255)
);
INSERT INTO food_items (name, count, dietary_preferences,cultural_preferences,food_type) VALUES
('Amaranth leaves', 10, 'Vegetarian', NULL, 'Vegetable'),
('Argan oil', 10, 'Vegan', NULL, 'Oil'),
('Barley flour', 10, 'Vegan', 'Halal', 'Flour'),
('Black beans', 10, 'Vegan', NULL, 'Carbs'),
('Black eyed Beans', 10, 'Vegan', NULL, 'Carbs'),
('Buckwheat', 10, 'Gluten Free', NULL, 'Grains'),
('Bulgar', 10, 'Vegan', NULL, 'Grains'),
('Cabbage', 10, 'Vegetarian', NULL, 'Vegetable'),
('Cane sugar', 10, 'Vegan', NULL, 'Sugar'),
('Casava root', 10, 'Vegetarian', NULL, 'Vegetable'),
('Cashews', 10, 'Keto', 'Halal', 'Nuts'),
('Cassava Flour', 10, 'Gluten Free', NULL, 'Flour'),
('Cheakpeas', 10, 'Vegetarian', NULL, 'Vegetable'),
('Coconut milk', 10, 'Dairy Free', NULL, 'Cooking Ingredients'),
('Corn Flour', 10, 'Gluten Free', NULL, 'Flour'),
('Corn meal', 10, 'Gluten Free', NULL, 'Flour'),
('Couscous', 10, 'Vegan', NULL, 'Carbs'),
('Dates', 10, 'Vegetarian', NULL, 'Vegetable'),
('Dry Cassava leaves', 10, 'Vegetarian', NULL, 'Cooking Ingredients'),
('Dry Fish', 10, 'Pescetarian', NULL, 'Fish'),
('Eggplant', 10, 'Vegetarian', NULL, 'Vegetable'),
('Egusi', 10, 'Vegan', NULL, 'Grains'),
('Fresh peanut', 10, 'Keto', 'Halal', 'Nuts'),
('Fufu Flour', 10, 'Gluten Free', NULL, 'Flour'),
('Gari', 10, 'Gluten Free', NULL, 'Flour'),
('Gombo', 10, 'Vegetarian', NULL, 'Vegetable'),
('Grounded peanut', 10, 'Keto', NULL, 'Nuts'),
('Injera', 10, 'Gluten Free', NULL, 'Carbs'),
('Leek', 10, 'Vegetarian', NULL, 'Vegetable'),
('Lentils', 10, 'Vegan', NULL, 'Carbs'),
('Milo', 10, 'Dairy', NULL, 'Milk Powder'),
('Nido', 10, 'Dairy', NULL, 'Milk Powder'),
('Olive oil', 10, 'Keto', NULL, 'Oil'),
('Olives', 10, 'Vegetarian', NULL, 'Fruit'),
('Palm Cream', 10, 'Dairy Free', NULL, 'Cooking Ingredients'),
('Palm oil', 10, 'Keto', NULL, 'Oil'),
('Peanut in Shell', 10, 'Keto', 'Halal', 'Nuts'),
('Plantain  Yellow', 10, 'Vegetarian', NULL, 'Fruit'),
('Plantain Flour', 10, 'Gluten Free', NULL, 'Flour'),
('Plantain GREEN', 10, 'Vegetarian', NULL, 'Fruit'),
('Pounded yam flour', 10, 'Gluten Free', NULL, 'Flour'),
('Rice', 10, 'Vegan', NULL, 'Grains'),
('Roasted barley', 10, 'Vegan', NULL, 'Grains'),
('Roasted peanut', 10, 'Keto', NULL, 'Nuts'),
('Romano beans', 10, 'Vegan', NULL, 'Carbs'),
('Semolina', 10, 'Vegan', NULL, 'Grains'),
('Butternut Squash', 10, 'Vegetarian', NULL, 'Vegetable'),
('Kabocha Squash', 10, 'Vegetarian', NULL, 'Vegetable'),
('Sweet Potatoes', 10, 'Vegetarian', NULL, 'Vegetable'),
('Taro root', 10, 'Vegetarian', NULL, 'Vegetable'),
('Teff Flour', 10, 'Gluten Free', NULL, 'Flour'),
('Watabaga Root', 10, 'Keto', NULL, 'Vegetable'),
('Wheat flour', 10, 'Vegan', NULL, 'Flour'),
('White beans', 10, 'Vegan', NULL, 'Carbs'),
('whole green peas', 10, 'Vegetarian', NULL, 'Vegetable'),
('Whole wheat flour', 10, 'Vegan', NULL, 'Flour'),
('Yam root', 10, 'Vegetarian', NULL, 'Vegetable'),
('Young Coconut', 10, 'Vegetarian', NULL, 'Vegetable'),
('Zucchini Grey', 10, 'Vegetarian', NULL, 'Vegetable'),
('White Corn Flour', 10, 'Gluten Free', NULL, 'Flour'),
('White Corn Meal', 10, 'Gluten Free', NULL, 'Grains'),
('Peanut Powder', 10, 'Vegan', NULL, 'Nuts'),
('BuckWheat Flour', 10, 'Vegan', NULL, 'Flour'),
('Split Cheak Peas', 10, 'Vegetarian', NULL, 'Vegetable'),
('Wheat Semolina', 10, 'Vegan', NULL, 'Grains'),
('Habanero Hot Peppers', 10, 'Vegetarian', NULL, 'Vegetable'),
('Scotch Bonnet peppers', 10, 'Vegetarian', NULL, 'Vegetable'),
('Purple Yams', 10, 'Vegetarian', NULL, 'Vegetable'),
('Red Kidney Beans', 10, 'Vegan', NULL, 'Carbs'),
('Red Chili Beans', 10, 'Vegan', NULL, 'Carbs'),
('American Eggplant', 10, 'Vegetarian', NULL, 'Vegetable'),
('Baby Egg Plant', 10, 'Vegetarian', NULL, 'Vegetable'),
('Long Egg Plant', 10, 'Vegetarian', NULL, 'Vegetable'),
('Eddo', 10, 'Vegetarian', NULL, 'Vegetable'),
('Dasheen', 10, 'Vegetarian', NULL, 'Vegetable'),
('Rutabaga', 10, 'Vegetarian', NULL, 'Vegetable'),
('Zucchini', 10, 'Vegetarian', NULL, 'Vegetable'),
('Okra', 10, 'Vegetarian', NULL, 'Vegetable'),
('Bitter Gourd', 10, 'Vegetarian', NULL, 'Vegetable');
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

  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone_number VARCHAR(20),
  address VARCHAR(255),
  region ENUM('NW', 'NE', 'SW', 'SE'), 
  country_of_origin VARCHAR(255),
  spoken_language VARCHAR(255),
  referrer VARCHAR(255) 
);
INSERT INTO user_profiles VALUES
(1, 1, 'John', 'Doe', 'johndoe@gmail.com', '555-555-5555', '126 Address St', 'NW', 'Bulgaria', 'Bulgarian', 'Bulgarian Govt'),
(2, 2, 'Jane', 'Admin-Doe', 'janedoe@gmail.com', '555-555-5555', '127 Address St', 'NW', 'France', 'French', 'France Govt');

DELIMITER //
CREATE TRIGGER createEmptyProfileRow
AFTER INSERT ON users
FOR EACH ROW
BEGIN
  INSERT INTO user_profiles (user_id)
  VALUES (NEW.id);
END//
DELIMITER ;

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  time_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  items JSON NOT NULL,
  type ENUM('delivery', 'pickup') NOT NULL,
  status ENUM('pending', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  delivery_time DATETIME,
  address VARCHAR(255)
);
