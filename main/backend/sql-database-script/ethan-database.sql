CREATE TABLE FoodRecipes (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    image_url VARCHAR(255)
);

INSERT INTO FoodRecipes (id, title, image_url) VALUES (1, 'Braised Chicken Bee Hoon', 'https://ch-api.healthhub.sg/api/public/content/ca165d23573044538855965d3ec2d7a8?v=44676739'),
(2, 'Watermelon Smoothie', 'https://www.wellplated.com/wp-content/uploads/2020/07/Creamy-Watermelon-Smoothie.jpg'),(3, 'https://ch-api.healthhub.sg/api/public/content/2a3eb524c70b4d149d3fbec0c8aebebe?v=18d7e215');