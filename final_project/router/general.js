const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here


  return res.json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

  let isbn = req.params.isbn

  let filtedBook = books[isbn]
  //Write your code here
  return res.send(JSON.stringify(filtedBook));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  let selectedBook = Object.values(books).filter((book) => book.author === author);

  return res.json(selectedBook);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;

  let selectedBook = Object.values(books).filter((book) => book.title === title);

  return res.json(selectedBook);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
