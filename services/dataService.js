//import jsonwebtoken

const jwt = require('jsonwebtoken')

//import db.js

const db = require('./db')

//Database

// db = {
//     1000: { "acno": 1000, "username": "anu", "password": 1000, "balance": 8000,transaction:[] },
//     1001: { "acno": 1001, "username": "ann", "password": 1001, "balance": 9000,transaction:[] },
//     1002: { "acno": 1002, "username": "balu", "password": 1002, "balance": 8500,transaction:[] },
//     1003: { "acno": 1003, "username": "vinu", "password": 1003, "balance": 7500,transaction:[] },
//     1004: { "acno": 1004, "username": "manu", "password": 1004, "balance": 8500,transaction:[] },

//   }

// register
const register = (username, acno, password) => {
  //asynchronus function call


  return db.User.findOne({
    acno
  }).then(user => {
    if (user) {
      return {
        status: false,
        message: "Already Existing user....Please Log in",
        statusCode: 401
      }
    }
    else {
      // insert in db
      const newUser = new db.User({
        acno,
        username,
        password,
        balance: 0,
        transaction: []
      })
      newUser.save()
      return {
        status: true,
        message: "Registered Successfully",
        statusCode: 200
      }
    }

  })
}


// login
const login = (acno, pswd) => {
  return db.User.findOne({
    acno,
    password: pswd
  }).then(user => {
    if (user) {
      currentUser = user.username
      currentAcno = acno

      //  token generation
      token = jwt.sign({
        //store account no.inside token
        currentAcno: acno

      }, 'supersecretkey12345')

      return {
        status: true,
        message: "Login Successfully",
        statusCode: 200,
        currentUser,
        currentAcno,
        token
      }
    }
    else {
      return {
        status: false,
        message: "Invalid account number and password",
        statusCode: 401
      }
    }

  })
}

  
 


// deposit
const deposit = (acno, password, amt) => {

  var amount = parseInt(amt)
  return db.User.findOne({
    acno,password
  }).then(user=>{
    if(user){
      user.balance += amount
      user.transaction.push({
        type: "CREDIT",
        amount: amount
      })
      user.save()
      return {
        status: true,
        message: amount + "is depositted Successfully and balance is" + user.balance,
        statusCode: 200
      }
    }
    else {
      return {
        status: false,
        message: "Invalid account number and password",
        statusCode: 401
      }
    }
  })

  
  
}

// withdraw
const withdraw = (acno, password, amt) => {
  var amount = parseInt(amt)

  return db.User.findOne({
    acno,password
  }).then(user=>{
    if(user){
if (amount < user.balance) {
        user.balance-= amount
        user.transaction.push({
          type: "DEBIT",
          amount: amount
        })
        user.save()

        return {
          status: true,
          message: amount + "is debitted Successfully and balance is" + user.balance,
          statusCode: 200
        }

      }
      else {
        return {
          status: false,
          message: "Insufficent Balance!!!",
          statusCode: 422
        }
      }
    }
    
    else {
      return {
        status: false,
        message: "Invalid username and password",
        statusCode: 401
      }
    }
  })
}
//transaction
const getTransaction = (acno) => {
  return db.User.findOne({
      acno
  }).then(user=>{
    if(user){
        return {
          status: true,
          statusCode: 200,
          transaction: user.transaction
        }
      }
      else {
        return {
          status: false,
          message: "user doesnot exist!!!!!",
          statusCode: 401
        }
      }
  })
  

  }
  


//   export
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}

