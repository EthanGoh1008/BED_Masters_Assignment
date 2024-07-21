CREATE TABLE Books (
    book_id INT PRIMARY KEY IDENTITY(1,1),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    availability CHAR(1) CHECK (availability IN ('Y', 'N')) NOT NULL
);

INSERT INTO Books (title, author, availability)
VALUES
('Book Title 1', 'Author 1', 'Y'),
('Book Title 2', 'Author 2', 'N'),
('Book Title 3', 'Author 3', 'Y');


SELECT * FROM Books;
SELECT * FROM Users;

