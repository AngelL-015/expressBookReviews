# Express Book Reviews
This repository contains my final project for IBM's *Developing Back-End Apps with Node.js and Express*, part of the *IBM Full Stack Developer Professional Certificate on Coursera*. The project focuses on building a server-side online book system with a secure REST API, JWT-based session-level authentication, and asynchronous programming.

## Table of Contents
- [Course Information](#course-information)
- [Project Purpose](#project-purpose)
- [My Role](#my-role)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

## Course Information
*Developing Back-End Apps with Node.js and Express* is an introduction to backend development. It shows what is expected of a backend developer, demonstrating the scope of their work — the part of a website or application that users do not see. This consists of managing the server, database, and application logic, ensuring the frontend has access to the necessary data to work. Throughout the course, students use Node.js and Express to build applications. The course provides the tools, libraries, and packages that any backend developer should know to succeed in backend development.

## Project Purpose
*Express Book Reviews* is an application that has a catalog of books where users can search information about a book and view or leave a review. The project's goal is to implement working routes and establish a session based environment with JSON Web Token (JWT). Additionally, the user should be given the option to register, and those who have an account, authenticated users, are the only ones who can make a review. Otherwise, any user should be able to navigate and see the catalog. 

## My Role
As the back-end developer, I was responsible for implementing the route functionality using Express and Node.js. I was provided with a skeleton of the application. My tasks included: 
- Enabling routes for users to browse a catalog of books
- Providing users with the option to register and login
- Implementing JWT-based session authentication for logged-in users
- Allowing authenticated users to add, update, and delete only their review
- Making general routes asynchronous (excluding authenticated user tasks)

## Tech Stack
This project focuses on backend development:
- JavaScript - Main language
- Node.js - Runtime environment
- Express - Web framework 

## Getting Started
The backend application can be run locally. After cloning the repository, navigate to the **final_project** directory and install all necessary dependencies. Run `npm start` to set up the local server. Then use an API development platform, such as Postman, to test requests. Alternatively, you can use the `curl` command to make requests.

### Run the Project Locally
1. Clone the repository

    `git clone <repository-url>`

2. Navigate into the project directory
    
    `cd expressBookReviews/final_project`

3. Install Dependencies
    
    `npm install`

4. Run a local server
    
    `npm start`

5. Use your favorite API development platform, or alternatively use `curl` commands from a separate terminal.

### API Endpoints
Here are the API endpoints you can reference.

**Get all books**
```
GET localhost:5000/
```

**Get book by ISBN**
```
GET localhost:5000/isbn/:isbn
```

**Get book by author**
```
GET localhost:5000/author/:author
```

**Get book by title**
```
GET localhost:5000/title/:title
```

**Get book review**
```
GET localhost:5000/review/:isbn
```

**Register user**
```
POST localhost:5000/register
```
Body:

```
{
    "username": "myusername",
    "password": "mypassword"
}
```

**Login user**
```
POST localhost:5000/customer/login
```
Body:
```
{
    "username": "myusername",
    "password": "mypassword"
}
```

**Add/Update a user's book review**
```
PUT localhost:5000/customer/auth/review/:isbn
```
Body:
```
{
    "review": "I love this book, it speaks only facts."
}
```
**Delete a user's book review**
```
DELETE localhost:5000/customer/auth/review/:isbn
```
