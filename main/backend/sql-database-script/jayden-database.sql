/*  Events */
CREATE TABLE Events (
    event_id INT IDENTITY(1,1) PRIMARY KEY,
    event_date DATE NOT NULL,
    event_title NVARCHAR(255) NOT NULL,
    event_image_url NVARCHAR(255) NOT NULL
);

INSERT INTO Events (event_date, event_title, event_image_url)
VALUES 
    ('2024-06-17', 'Sunset Yoga in the Park', 'https://source.unsplash.com/random/?event&h=200&w=250&q=100&0'),
    ('2024-06-18', 'Coding Workshop: Intro to React', 'https://source.unsplash.com/random/?event&h=200&w=250&q=100&1'),
    ('2024-06-22', 'Language Exchange - French & English', 'https://source.unsplash.com/random/?event&h=200&w=250&q=100&2'),
    ('2024-06-30', 'Live Music at The Blue Note', 'https://source.unsplash.com/random/?event&h=200&w=250&q=100&3');
