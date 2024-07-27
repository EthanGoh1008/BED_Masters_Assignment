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

CREATE TABLE Forums (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    image_url NVARCHAR(255) NULL
);

INSERT INTO Forums (title, description, image_url)
VALUES
    ('Running Marathon Association', 'The members inside are active in participating.', 'https://i.insider.com/5da1a45a695b5841f16ee2f6?width=700'),
    ('Cycle Breakers', 'This cycling group is amazing!', 'https://media.gettyimages.com/id/496719837/photo/motivation-fuels-the-human-engine.jpg?s=612x612&w=gi&k=20&c=r0KxFdmU6VwSsBhIkRzLHOY5yK2RZYnL9JkpcdLHrzE=');

