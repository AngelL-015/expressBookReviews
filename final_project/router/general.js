const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register a user
public_users.post("/register", (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(404).json({message: "Unable to register user."});
  }
  
  // Add the user to the array if valid
  if (isValid(username)) {
    users.push({"username": username, "password": password});
    return res.status(200).json({message: `User ${username} has successfully registered. Now you can login`});
  } else{
    return res.status(404).json({message: "User already exists!"});
  }
  
});

// Gets list of books in the shop
public_users.get('/', function (req, res) {
    
  new Promise((resolve, reject) => {
    
    if (books) {
      resolve(books);
    } else {
      reject("Books not found");;
    }

  })
  .then((booksData) => {
    return res.status(200).json(booksData);
  })
  .catch((error) => {
    return res.status(500).json({ message: error });
  });

});

// Gets book based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  
  new Promise((resolve, reject) => {

    if (books[req.params.isbn]) {
      resolve(books[req.params.isbn]);
    } else {
      reject(`Book with selected isbn ${req.params.isbn} not found`);
    }

  })
  .then((booksData) => {
    return res.status(200).json(booksData);
  })
  .catch((error) => {
    return res.status(404).json({ message: error });
  });
  
 });
  
// Gets books by a author
public_users.get('/author/:author', function (req, res) {
  
  new Promise((resolve, reject) => {
    
    const requested_books = Object.fromEntries(
      Object.entries(books).filter(
        ([key, book]) => book.author === req.params.author
      )
    );

    if (Object.keys(requested_books).length > 0) {
      resolve(requested_books);
    } else {
      reject(`There are no books under the author ${req.params.author}`);
    }

  })
  .then((booksData) => {
    return res.status(200).json(booksData);
  })
  .catch((error) => {
    return res.status(404).json({ message: error });
  });

});

// Gets books based on title
public_users.get('/title/:title', function (req, res) {
  
  new Promise((resolve, reject) => {
    
    const requested_books = Object.fromEntries(
      Object.entries(books).filter(
        ([key, book]) => book.title === req.params.title
      )
    );

    if (Object.keys(requested_books).length > 0) {
      resolve(requested_books);
    } else {
      reject(`There are no books under that title ${req.params.title}`);
    }

  })
  .then((booksData) => {
    return res.status(200).json(booksData);
  })
  .catch((error) => {
    return res.status(404).json({ message: error });
  });

});

// Gets book's reviews
public_users.get('/review/:isbn', function (req, res) {

  new Promise((resolve, reject) => {

    if (Object.keys(books[req.params.isbn].reviews).length > 0 ) {
      resolve(books[req.params.isbn].reviews);
    } else {
      reject(`The book with isbn ${req.params.isbn} has no reviews`);
    }

  })
  .then((booksData) => {
    return res.status(200).json(booksData);
  })
  .catch((error) => {
    return res.status(404).json({ message: error });
  });

});

module.exports.general = public_users;
