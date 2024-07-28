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
    ('Photography Enthusiasts', 'A group for people who love capturing moments.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&1'),
    ('Tech Innovators', 'Discuss the latest in technology and innovation.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&2'),
    ('Cooking Masters', 'Share recipes and cooking tips.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&3'),
    ('Fitness Freaks', 'A community for fitness and wellness enthusiasts.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&4'),
    ('Book Lovers', 'A place for bookworms to discuss their favorite reads.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&5'),
    ('Garden Gurus', 'All about gardening and plant care.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&6'),
    ('Travel Buffs', 'Share travel experiences and tips.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&7'),
    ('Pet Owners United', 'A forum for pet owners to share advice and stories.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&8'),
    ('DIY Creators', 'Discuss DIY projects and craft ideas.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&9'),
    ('Music Maniacs', 'A place for music lovers to connect and share.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&10'),
    ('Movie Buffs', 'Discuss the latest movies and classics.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&11'),
    ('Language Learners', 'A forum for people learning new languages.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&12'),
    ('History Buffs', 'Discuss historical events and figures.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&13'),
    ('Science Geeks', 'For those interested in science and discoveries.', 'https://source.unsplash.com/random/?forum&h=200&w=250&q=100&14'),

