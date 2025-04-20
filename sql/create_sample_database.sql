DROP DATABASE IF EXISTS food;
CREATE DATABASE food;
USE food;

-- Create tables for preferences and food types
CREATE TABLE dietary_preferences (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_en VARCHAR(255) NOT NULL UNIQUE,
  name_fr VARCHAR(255) NOT NULL
);

CREATE TABLE cultural_preferences (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_en VARCHAR(255) NOT NULL UNIQUE,
  name_fr VARCHAR(255) NOT NULL
);

CREATE TABLE food_type (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_en VARCHAR(255) NOT NULL UNIQUE,
  name_fr VARCHAR(255) NOT NULL
);

-- Insert data into the new tables
INSERT INTO dietary_preferences (name_en, name_fr) VALUES
('Vegetarian', 'Végétarien'),
('Vegan', 'Végétalien'),
('Gluten Free', 'Sans Gluten'),
('Dairy Free', 'Délactosés'),
('Keto', 'Cétogène'),
('Pescetarian', 'Pescétarien'),
('Dairy', 'Laitier');

INSERT INTO cultural_preferences (name_en, name_fr) VALUES
('Halal', 'Halal');

INSERT INTO food_type (name_en, name_fr) VALUES
('Vegetable', 'Légumes'),
('Oil', 'Huiles'),
('Flour', 'Farines'),
('Carbs', 'Glucides'),
('Grains', 'Grains'),
('Sugar', 'Sucres'),
('Nuts', 'Noix'),
('Cooking Ingredients', 'Ingrédients de Cuisine'),
('Fish', 'Poissons'),
('Milk Powder', 'Poudre de Lait'),
('Fruit', 'Fruits');

-- Modify food_items table to use foreign keys
CREATE TABLE food_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name_en VARCHAR(255) NOT NULL UNIQUE,
  max_per_person INT NOT NULL DEFAULT -1,
  count INT NOT NULL,
  dietary_preferences INT,
  cultural_preferences INT,
  food_type INT,
  name_fr VARCHAR(255),
  FOREIGN KEY (dietary_preferences) REFERENCES dietary_preferences(id),
  FOREIGN KEY (cultural_preferences) REFERENCES cultural_preferences(id),
  FOREIGN KEY (food_type) REFERENCES food_type(id)
);

-- Insert food items with foreign key references
INSERT INTO food_items (name_en, count, dietary_preferences, cultural_preferences, food_type, name_fr) VALUES
('Amaranth leaves', 10, 1, NULL, 1, 'Feuilles d''Amarante'),
('Argan oil', 10, 2, NULL, 2, 'Huile d''Argan'),
('Barley flour', 10, 2, 1, 3, 'Farine d''Orge'),
('Black beans', 10, 2, NULL, 4, 'Haricots Noirs'),
('Black eyed Beans', 10, 2, NULL, 4, 'Haricots à œil Noir'),
('Buckwheat', 10, 3, NULL, 5, 'Sarrasin'),
('Bulgar', 10, 2, NULL, 5, 'Boulgour'),
('Cabbage', 10, 1, NULL, 1, 'Chou'),
('Cane sugar', 10, 2, NULL, 6, 'Sucre de Canne'),
('Casava root', 10, 1, NULL, 1, 'Racine de Manioc'),
('Cashews', 10, 5, 1, 7, 'Noix de Cajou'),
('Cassava Flour', 10, 3, NULL, 3, 'Farine de Manioc'),
('Cheakpeas', 10, 1, NULL, 1, 'Pois Chiches'),
('Coconut milk', 10, 4, NULL, 8, 'Lait de Coco'),
('Corn Flour', 10, 3, NULL, 3, 'Farine de Maïs'),
('Corn meal', 10, 3, NULL, 3, 'Semoule de Maïs'),
('Couscous', 10, 2, NULL, 4, 'Couscous'),
('Dates', 10, 1, NULL, 1, 'Dattes'),
('Dry Cassava leaves', 10, 1, NULL, 8, 'Feuilles de Manioc Séchées'),
('Dry Fish', 10, 6, NULL, 9, 'Poisson Séché'),
('Eggplant', 10, 1, NULL, 1, 'Aubergine'),
('Egusi', 10, 2, NULL, 5, 'Égousi'),
('Fresh peanut', 10, 5, 1, 7, 'Cacahuète Fraîche'),
('Fufu Flour', 10, 3, NULL, 3, 'Farine de Fufu'),
('Gari', 10, 3, NULL, 3, 'Gari'),
('Gombo', 10, 1, NULL, 1, 'Gombo'),
('Grounded peanut', 10, 5, NULL, 7, 'Cacahuète Moulue'),
('Injera', 10, 3, NULL, 4, 'Injera'),
('Leek', 10, 1, NULL, 1, 'Poireau'),
('Lentils', 10, 2, NULL, 4, 'Lentilles'),
('Milo', 10, 7, NULL, 10, 'Milo'),
('Nido', 10, 7, NULL, 10, 'Nido'),
('Olive oil', 10, 5, NULL, 2, 'Huile d''Olive'),
('Olives', 10, 1, NULL, 11, 'Olives'),
('Palm Cream', 10, 4, NULL, 8, 'Crème de Palme'),
('Palm oil', 10, 5, NULL, 2, 'Huile de Palme'),
('Peanut in Shell', 10, 5, 1, 7, 'Cacahuète en Coque'),
('Plantain  Yellow', 10, 1, NULL, 11, 'Plantain Jaune'),
('Plantain Flour', 10, 3, NULL, 3, 'Farine de Plantain'),
('Plantain GREEN', 10, 1, NULL, 11, 'Plantain Vert'),
('Pounded yam flour', 10, 3, NULL, 3, 'Farine d''Igname Pilée'),
('Rice', 10, 2, NULL, 5, 'Riz'),
('Roasted barley', 10, 2, NULL, 5, 'D''Ogre Grillé'),
('Roasted peanut', 10, 5, NULL, 7, 'Arachides Grillé'),
('Romano beans', 10, 2, NULL, 4, 'Haricots Romano'),
('Semolina', 10, 2, NULL, 5, 'Semoule'),
('Butternut Squash', 10, 1, NULL, 1, 'Courge Musquée'),
('Kabocha Squash', 10, 1, NULL, 1, 'Courge Kabocha'),
('Sweet Potatoes', 10, 1, NULL, 1, 'Patate Douce'),
('Taro root', 10, 1, NULL, 1, 'Racine de Taro'),
('Teff Flour', 10, 3, NULL, 3, 'Farine de Teff'),
('Watabaga Root', 10, 5, NULL, 1, 'Racine de Rutabaga'),
('Wheat flour', 10, 2, NULL, 3, 'Farine de Blé'),
('White beans', 10, 2, NULL, 4, 'Haricots Blancs'),
('whole green peas', 10, 1, NULL, 1, 'Poir Verts'),
('Whole wheat flour', 10, 2, NULL, 3, 'Farine de Blé Complète'),
('Yam root', 10, 1, NULL, 1, 'Racine d''Igname'),
('Young Coconut', 10, 1, NULL, 1, 'Jeunes Noix de Coco'),
('Zucchini Grey', 10, 1, NULL, 1, 'Courgettes Gris'),
('White Corn Flour', 10, 3, NULL, 3, 'Farine de Maïs Blanc'),
('White Corn Meal', 10, 3, NULL, 5, 'Semoule de Maïs Blanc'),
('Peanut Powder', 10, 2, NULL, 7, 'Poudre d''Arachide'),
('BuckWheat Flour', 10, 2, NULL, 3, 'Farine de Sarrasin'),
('Split Cheak Peas', 10, 1, NULL, 1, 'Pois Chiches Cassés'),
('Wheat Semolina', 10, 2, NULL, 5, 'Semoule de Blé'),
('Habanero Hot Peppers', 10, 1, NULL, 1, 'Piment Habanero'),
('Scotch Bonnet peppers', 10, 1, NULL, 1, 'Piment Scotch Bonnet'),
('Purple Yams', 10, 1, NULL, 1, 'Ignames Violettes'),
('Red Kidney Beans', 10, 2, NULL, 4, 'Haricot Rouges'),
('Red Chili Beans', 10, 2, NULL, 4, 'Haricots Piments Rouges'),
('American Eggplant', 10, 1, NULL, 1, 'Aubergine Américaine'),
('Baby Egg Plant', 10, 1, NULL, 1, 'Petites Aubergine'),
('Long Egg Plant', 10, 1, NULL, 1, 'Aubergines Longue'),
('Eddo', 10, 1, NULL, 1, 'Eddo'),
('Dasheen', 10, 1, NULL, 1, 'Dasheen'),
('Rutabaga', 10, 1, NULL, 1, 'Rutabaga'),
('Zucchini', 10, 1, NULL, 1, 'Courgettes'),
('Okra', 10, 1, NULL, 1, 'Gombo'),
('Bitter Gourd', 10, 1, NULL, 1, 'Courge Amère');

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
