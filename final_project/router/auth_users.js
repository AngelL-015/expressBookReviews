const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Check if a user with the given username already exists
const isValid = (username)=>{ //returns boolean
  return !users.some((user) => user.username === username);
}


// Code to check if username and password match the one we have in records.
const authenticatedUser = (username, password)=>{ //returns boolean
  return users.some((user) => user.username === username && user.password === password);
}


// Only registered users can login
regd_users.post("/login", (req,res) => {
  
  const username = req.body.username;
  const password = req.body.password;

  // Check if username or password is provided
  if(!username || !password) {
    return res.status(404).json({ message: "Error Logging In"});
  }

  // Check if value login
  if (!authenticatedUser(username, password)) {
    return res.status(208).json({ message: "Invalid Login. Check username or password."});
  }
  
  // Generate JWT access token
  let accessToken = jwt.sign({username}, "access", {expiresIn: '1hr'});

  // Store access token and username in session
  req.session.authorization = {
    accessToken, username
  };
  
  return res.status(200).json({ message: "User succesfully logged in"});
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  const review = req.body.reviews

  // Notifies if ISBN doesn't exist
  if (!books[isbn]) {
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found`});
  } 

  // Validate review content
  if (!review || review.trim().length === 0) {
    return res.status(400).json({ message: `Review content is required`});
  }
  
  // Add or Update a review
  books[isbn].reviews[username] = review.trim();
  
  return res.status(200).json(books[isbn]);
});


// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  // Notifies if ISBN doesn't exist
  if (!books[isbn]) {
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found`});
  } 
  
  // Notifies if review by user doesn't exist for selected ISBN
  if (!books[isbn].reviews[username]) {
    return res.status(404).json({ message: `No review by ${username} found for ${isbn}`})
  }

  // Delete a review
  delete books[isbn].reviews[username];
  
  return res.status(200).json(books[isbn]);  
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
