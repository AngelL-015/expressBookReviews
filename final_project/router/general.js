const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

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


/* 

Task 10–13: 
Above, these endpoints are implemented with callbacks and Promises. 
They have now been refactored to use async/await with Axios.

*/

// Helper function to fetch data from requested url
async function fetchData(url) {
  const response = await axios.get(url);
  return response.data;
}

// Gets list of books (Async/Await with Axios)
public_users.get('/async', async function(req, res) {
  try {
    const bookList = await fetchData('http://localhost:5000/');
    res.json(bookList);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book list" });
  }
});

// Gets book by isbn (Async/Await with Axios)
public_users.get('/async/isbn/:isbn', async function(req, res) {
  try {
    const requestedIsbn = req.params.isbn;
    const book = await fetchData('http://localhost:5000/isbn/' + requestedIsbn);
    res.json(book);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Error retrieving book list" });
    }
  }
});

// Gets book by author (Async/Await with Axios)
public_users.get('/async/author/:author', async function(req, res) {
  try {
    const requestedAuthor = req.params.author;
    const book = await fetchData('http://localhost:5000/author/' + requestedAuthor); // Can return multiple books
    res.json(book);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Error retrieving book list" });
    }
  }
});

// Gets book by title (Async/Await with Axios)
public_users.get('/async/title/:title', async function(req, res) {
  try {
    const requestedTitle = req.params.title;
    const book = await fetchData('http://localhost:5000/title/' + requestedTitle);
    res.json(book);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Error retrieving book list" });
    }
  }
});

module.exports.general = public_users;
