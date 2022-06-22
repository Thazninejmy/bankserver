//import jsonwebtoken

const jwt=require('jsonwebtoken')

//Database

db = {
    1000: { "accno": 1000, "username": "anu", "password": 1000, "balance": 8000,transaction:[] },
    1001: { "accno": 1001, "username": "ann", "password": 1001, "balance": 9000,transaction:[] },
    1002: { "accno": 1002, "username": "balu", "password": 1002, "balance": 8500,transaction:[] },
    1003: { "accno": 1003, "username": "vinu", "password": 1003, "balance": 7500,transaction:[] },
    1004: { "accno": 1004, "username": "manu", "password": 1004, "balance": 8500,transaction:[] },

  }

  // register
  const register=(username,acno,password)=>{
    if(acno in db){
      return {
        status:false,
        message:"Already Existing user....Please Log in",
        statusCode:401
      }
    }
    else{
      // insert in db
      db[acno]={
        acno,
        username,
        password,
        "balance":0,
        transaction:[]
      }
      console.log(db);
      return {
        status:true,
        message:"Registered Successfully",
        statusCode:200
      }
    }
  }


// login
  const login=(acno,pswd)=> {

    if (acno in db) {
      if (pswd == db[acno]["password"]) {
       currentUser= db[acno]["username"]
       currentAcno=acno

      //  token generation
       token=jwt.sign({
         //store account no.inside token
         currentAcno:acno

       },'supersecretkey12345')
      
          return {
            status:true,
            message:"Login Successfully",
            statusCode:200,
            currentUser,
            currentAcno,
            token
          }
        }

    
      else {
        return {
          status:false,
          message:"incorrect password",
          statusCode:401
        }
      }
    }
  else {
      return {
        status:false,
        message:"user doesnot exist!!!!!",
        statusCode:401
      }
    }
  }

  // deposit
  const deposit=(acno,password,amt)=>{

    var amount=parseInt(amt)
  
    if(acno in db){
        if(password==db[acno]["password"]){
          db[acno]["balance"]+=amount
          db[acno].transaction.push({
            type:"CREDIT",
            amount:amount
          })
          return {
            status:true,
            message:amount+ "is depositted Successfully and balance is"+db[acno]["balance"],
            statusCode:200
          }
          
        }
        else{
          return {
            status:false,
            message:"incorrect password",
            statusCode:401
          }
        }
    }
    else{
      return {
        status:false,
        message:"user doesnot exist!!!!!",
        statusCode:401
      }
    }
  }

// withdraw
  const withdraw=(acno,password,amt)=>{
    var amount=parseInt(amt)
  
    if(acno in db){
      if(password==db[acno]["password"]){
      if(amount<db[acno]["balance"]){
        db[acno]["balance"]-=amount
        db[acno].transaction.push({
          type:"DEBIT",
          amount:amount
        })
        return {
          status:true,
          message:amount+ "is debitted Successfully and balance is"+db[acno]["balance"],
          statusCode:200
        }
         
      }
      else{
        return {
          status:false,
          message:"Insufficent Balance!!!",
          statusCode:422
        }
      }
      }
      else{
        return {
          status:false,
          message:"incorrect password",
          statusCode:401
        }
      }
  
    }
    else{
      return {
        status:false,
        message:"user doesnot exist!!!!!",
        statusCode:401
      }
    }
  
  }
//transaction
 const getTransaction=(acno)=>{
   if(acno in db){
    return {
      status:true,
      statusCode:200,
      transaction:db[acno].transaction
    }

   }
   else{
    return {
      status:false,
      message:"user doesnot exist!!!!!",
      statusCode:401
    }
   }
  }

//   export
  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
}
    
