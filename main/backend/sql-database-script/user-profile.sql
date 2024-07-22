CREATE TABLE UserProfile (
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT FOREIGN KEY REFERENCES Users(id),
    aboutMyself NVARCHAR(MAX),
    preferredEvent NVARCHAR(100)
);

INSERT INTO Users (username, email, password)
VALUES 
('exampleUser', 'example@example.com', 'password123'),
('liew', 'liewzhanyang@gmail.com', 'password123'),
('liewzhanyang@', 's10259432@connect.np.edu.sg', 'password123'),
('Alice', 'alice@example.com', 'password123'),
('Bob', 'bob@example.com', 'password123');

INSERT INTO UserProfile (userId, aboutMyself, preferredEvent)
VALUES 
(1, 'About exampleUser', 'Event 1'),
(2, 'About Liew', 'Event 2'),
(3, 'About Liewzhanyang', 'Event 3'),
(4, 'About Alice', 'Event 4'),
(5, 'About Bob', 'Event 5');
