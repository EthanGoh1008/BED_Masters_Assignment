# Healthy life SEA

Welcome to **Healthy Life SEA**, your go-to platform for promoting healthy lifestyles and preventive healthcare practices across Southeast Asia. Our mission is to increase awareness and provide valuable guidance on leading a healthier life.

At **Healthy Life SEA**, we believe that health and wellness should be accessible to everyone. Our website offers a variety of resources to help you adopt and maintain healthy habits, including:

- **Guides and Articles**: Expert advice and tips on nutrition, fitness, mental well-being, and more to help you make informed decisions about your health.
- **Events**: Join our community events and activities focused on health and wellness. From fitness challenges to wellness workshops, there's something for everyone.
- **Forum**: Engage with a community of like-minded individuals. Share your experiences, ask questions, and support each other on your journey to better health.

Whether you're looking to improve your diet, find a new workout routine, or simply connect with others interested in healthy living, **Healthy Life SEA** is here to support you every step of the way. Let's work together to build a healthier future for Southeast Asia!

The index.html is in admin-dashboard.html

## Credits

- lottie
- bootstrap
- swagger
- DALL-E
- https://www.youtube.com/watch?v=Y8HIFRPU6pM
- https://www.youtube.com/watch?v=YOmC5Tyk-nU
- https://stock.adobe.com/my/search?k=person+icon
- https://www.flaticon.com/free-icon/bell-ring_7167256
- youtube
- Mssql
- JWT.IO
- https://www.youtube.com/watch?v=XBu54nfzxAQ
- https://www.youtube.com/watch?v=xKs2IZZya7c&list=PLChiukrA-RMOEB1PRQqB1NITIRsDz9pIN&index=7
- https://www.youtube.com/watch?v=MpQbwtSiZ7E&list=PLChiukrA-RMOEB1PRQqB1NITIRsDz9pIN&index=8
- https://www.youtube.com/watch?v=DBMPXJJfQEA
- https://www.youtube.com/watch?v=y99YgaQjgx4
- https://bouldersausage.com/healthy-living/what-is-a-healthy-lifestyle/

Images:
https://i.insider.com/5da1a45a695b5841f16ee2f6?width=700
https://source.unsplash.com/random/?event&h=200&w=250&q=100&0
https://source.unsplash.com/random/?event&h=200&w=250&q=100&1
https://media.gettyimages.com/id/496719837/photo/motivation-fuels-the-human-engine.jpg?s=612x612&w=gi&k=20&c=r0KxFdmU6VwSsBhIkRzLHOY5yK2RZYnL9JkpcdLHrzE

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v12 or later)
- NPM (comes with Node.js)
- SQL Server (or another compatible SQL database)

## Setup Instructions

### 1. Setup Database

1. Open your SQL Server Management Studio or any SQL client.
2. Copy the following SQL commands and execute them to create the necessary tables and insert sample data:

```sql
-- Create Users table
CREATE TABLE dbo.Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL ,
    password VARCHAR(100) NOT NULL,
    role NVARCHAR(50) NOT NULL
);

-- Insert sample data into the Users table
INSERT INTO dbo.Users (username, email, password, role)
VALUES
('john_doe', 'john.doe@example.com', 'password123', 'admin'),
('jane_smith', 'jane.smith@example.com', 'password456', 'user'),
('alice_jones', 'alice.jones@example.com', 'password789', 'moderator');

-- Create UserProfile table
CREATE TABLE UserProfile (
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT FOREIGN KEY REFERENCES dbo.Users(id),
    aboutMyself NVARCHAR(MAX),
    preferredEvent NVARCHAR(100)
);

-- Insert data into UserProfile
INSERT INTO UserProfile (userId, aboutMyself, preferredEvent)
VALUES
(1, 'About exampleUser', 'Event 1'),
(2, 'About Liew', 'Event 2'),
(3, 'About Liewzhanyang', 'Event 3'),
(4, 'About Alice', 'Event 4'),
(5, 'About Bob', 'Event 5');
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables. Update the values to match your database configuration:

    PORT=3000
    DB_SERVER=your_sql_server_address
    DB_USER=your_sql_user
    DB_PASSWORD=your_sql_password
    DB_DATABASE=your_database_name
    JWT_SECRET=your_jwt_secret_key

### 3. Install Dependencies

Navigate to the root directory of the project and run the following command to install all necessary dependencies:

    npm install

### 4. Run the Backend Server

Start the backend server by running the following command:

    npm start

This will start the server on the port specified in your `.env` file (default is 3000).

### 5. Run the Frontend

Open a new terminal, navigate to the frontend directory, and start a local server to serve the frontend files. If you have `live-server` installed, you can use:

    live-server public
