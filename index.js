// server creation

//import jsonwebtoken

const jwt=require('jsonwebtoken')

// import express
const dataService=require('./services/dataService')

const express=require('express')
const { send, status } = require('express/lib/response')

// server appl create using express

const app=express()

// parse JSON data

app.use(express.json())

//application specific middleware
const appMiddleware=(req,res,next)=>{
    console.log("Application specific middleware");
    next()
}
//use middleware in app
app.use(appMiddleware)

// bank server

const jwtMiddleware=(req,res,next)=>{
    //fetch token
    try{
        token=req.headers['x-access-token']
        //verify token
        const data=jwt.verify(token,'supersecretkey12345')
        console.log(data);
        next()
    }
    catch{
        res.status(401).json({
            status:false,
            statusCode:401,
            message:"please login"

        })
    }
    

}

// register API

app.post('/register',(req,res)=>{

    // register solving

    const result=dataService.register(req.body.username,req.body.acno,req.body.password)
    res.status(result.statusCode).json(result) 
   
})

// login API

app.post('/login',(req,res)=>{

    // login solving

    const result=dataService.login(req.body.acno,req.body.pswd)
    res.status(result.statusCode).json(result) 
   
})

// deposit API

app.post('/deposit', jwtMiddleware,(req,res)=>{

    // deposit solving

    const result=dataService.deposit(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).json(result) 
   
})

// withdraw API

app.post('/withdraw' , jwtMiddleware,(req,res)=>{

    // withdraw solving

    const result=dataService.withdraw(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).json(result) 
   
})

// transaction API

app.post('/transaction' , jwtMiddleware,(req,res)=>{

    // transaction solving

    const result=dataService.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result) 
   
})


// user request resolving
// get request
app.get('/',(req,res)=>{
    res.send("GET REQUEST")
})
// post request
app.post('/',(req,res)=>{
    res.send("POST REQUEST")
})
// put request
app.put('/',(req,res)=>{
    res.send("PUT REQUEST")
})
// patch request
app.patch('/',(req,res)=>{
    res.send("PATCH REQUEST")
})
// delete request
app.delete('/',(req,res)=>{
    res.send("DELETE REQUEST")
})

// set up the port no.to the server app

app.listen(3000,()=>{
    console.log("server is started at 3000");
})

