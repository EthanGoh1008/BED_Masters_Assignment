--Zhan Yang database

--Create Table
CREATE TABLE dbo.Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role NVARCHAR(50) NOT NULL
);

-- Insert sample data into the Users table
INSERT INTO dbo.Users (username, email, password, role)
VALUES 
('john_doe', 'john.doe@example.com', 'password123', 'admin'),
('jane_smith', 'jane.smith@example.com', 'password456', 'user'),
('alice_jones', 'alice.jones@example.com', 'password789', 'moderator');


--Create Table
CREATE TABLE UserProfile (
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT FOREIGN KEY REFERENCES Users(id),
    aboutMyself NVARCHAR(MAX),
    preferredEvent NVARCHAR(100)
);


--Insert data
INSERT INTO UserProfile (userId, aboutMyself, preferredEvent)
VALUES 
(1, 'About exampleUser', 'Event 1'),
(2, 'About Liew', 'Event 2'),
(3, 'About Liewzhanyang', 'Event 3'),
(4, 'About Alice', 'Event 4'),
(5, 'About Bob', 'Event 5');
