# Polytechnic Library API

## Project Overview

The Polytechnic Library API is a backend system designed to manage book borrowing and user accounts for the library. The system allows for user registration, login, viewing available books, and updating book availability. It includes role-based access control for different user roles (library members and librarians).

## Features

- User registration and login with password encryption
- JWT-based authentication and authorization
- Role-based access control
- CRUD operations for books
- Database integration with Microsoft SQL Server

## Setup Instructions
1. **Configure environment variables:**
    Create a `.env` file in the root directory and add the following environment variables:
    ```sh
    DB_USER=your_db_user
    DB_PASS=your_db_password
    DB_SERVER=your_db_server
    DB_NAME=library-database
    JWT_SECRET=your_jwt_secret
    ```

2. **Set up the database:**
    Create the necessary tables in your Microsoft SQL Server database. You can use the following SQL script to create the tables:

    ```sql
    CREATE TABLE Users (
        user_id INT PRIMARY KEY IDENTITY(1,1),
        username VARCHAR(255) UNIQUE NOT NULL,
        passwordHash VARCHAR(255) NOT NULL,
        role VARCHAR(20) CHECK (role IN ('member', 'librarian')) NOT NULL
    );

    CREATE TABLE Books (
        book_id INT PRIMARY KEY IDENTITY(1,1),
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        availability CHAR(1) CHECK (availability IN ('Y', 'N')) NOT NULL
    );
    ```

3. **Run the application:**
    ```sh
    node app.js
    ```

4. **Test the API endpoints:**
    Use Postman or any API testing tool to test the API endpoints.


## Additional Information

- Make sure your Microsoft SQL Server is running and accessible.
- Ensure environment variables are correctly set in the `.env` file.
- Use Postman or any API testing tool to test the API endpoints.
