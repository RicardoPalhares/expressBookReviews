const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
 const isValidUser = users.find((user) => user.username === username);

 if(isValidUser){
  return false
 }else{
  return true
 }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validUser = users.filter((user) => {
  return (user.username == username && user.password == password);
});

if(validUser.length > 0){
  return true
}else{
  return false
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username
  const password = req.body.password

  if(!username || !password){
    return res.send("Incomplite login")
  }

  if(authenticatedUser(username, password)){
    let accessToken = jwt.sign({
      data:password
    }, 'access', {expiresIn: 60 * 60});

    req.session.authorization = {
      accessToken, username
    };

    return res.status(200).send("Login sucess!")
  }else{
    return res.status(208).send("Invalid login!")
  };

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn
  const review = req.body.review
  const bookFilter = books[isbn]



  if(bookFilter){
    bookFilter.review = review;

    return res.status(200).json({"Message ": "Update success!"});
  }else{

    return res.status(400).json({"Message ": "Don't find book!"});
  }


});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn
  const bookFilter = books[isbn]

  if(bookFilter){
    bookFilter.review = '';

    return res.status(200).json({"Message ": "Delete success!"});
  }else{

    return res.status(400).json({"Message ": "Don't find book!"});
  }

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
