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

