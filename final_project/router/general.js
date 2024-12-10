const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios")


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  
  // Check if username and password are provided
  if(!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Check if the username already exists
  const existingUser = users.find((user) => user.username === username);
  
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists. Please choose a different username." });
  }

  // If validations pass, register the new user
  users.push({ username: username, password: password });
  return res.status(201).json({ message: "User successfully registered!" });

  //------------meu
 /*  const userName = req.body.userName;
  const password = req.body.password;

  if(userName && password){
    if(users.filter((user) => {return user.userName == userName})){

      return res.status(400).json({message: "Username alredy exist!"});
    }else{
      users.push({"userName":userName,"password":password})
      return res.status(200).json({message: "Registed!"});
      
    }
  } */

});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
 const book = await res.json(books)

  return book;
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {

  let isbn = req.params.isbn

  let filtedBook = await books[isbn]
  //Write your code here
  return res.send(JSON.stringify(filtedBook));
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  let author = req.params.author;
  let selectedBook = await Object.values(books).filter((book) => book.author === author);

  return res.json(selectedBook);
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  let title = req.params.title;

  let selectedBook = await Object.values(books).filter((book) => book.title === title);

  return res.json(selectedBook);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  let isbn = req.params.isbn

  let selectedReview = Object.values(books[isbn].reviews);

  return res.json(selectedReview);
});

module.exports.general = public_users;
