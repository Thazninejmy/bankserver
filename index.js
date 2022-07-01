// server creation

//import jsonwebtoken

const jwt = require('jsonwebtoken')

// import express
const dataService = require('./services/dataService')

const express = require('express')
const { send, status } = require('express/lib/response')

// import cors

const cors=require('cors')

// server appl create using express

const app = express()

//cors use in server app

app.use(colors({

    origin:'http://localhost:4200'
}))

// parse JSON data

app.use(express.json())

//application specific middleware
const appMiddleware = (req, res, next) => {
    console.log("Application specific middleware");
    next()
}
//use middleware in app
app.use(appMiddleware)

// bank server

const jwtMiddleware = (req, res, next) => {
    //fetch token
    try {
        token = req.headers['x-access-token']
        //verify token
        const data = jwt.verify(token, 'supersecretkey12345')
        console.log(data);
        next()
    }
    catch {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: "please login"

        })
    }


}

// register API

app.post('/register', (req, res) => {

    // register solving

    dataService.register(req.body.username, req.body.acno, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)

        })

})

// login API

app.post('/login', (req, res) => {

    // login solving

    dataService.login(req.body.acno, req.body.pswd)
    .then(result => {
        res.status(result.statusCode).json(result)

    })

})

// deposit API

app.post('/deposit', jwtMiddleware, (req, res) => {

    // deposit solving-asynchronus

    dataService.deposit(req.body.acno, req.body.password, req.body.amt)
    .then(result => {
        res.status(result.statusCode).json(result)

    })

})

// withdraw API

app.post('/withdraw', jwtMiddleware, (req, res) => {

    // withdraw solving

    dataService.withdraw(req.body.acno, req.body.password, req.body.amt)
    .then(result => {
        res.status(result.statusCode).json(result)

    })
})

// transaction API

app.post('/transaction', jwtMiddleware, (req, res) => {

    // transaction solving

    dataService.getTransaction(req.body.acno)
    .then(result => {
        res.status(result.statusCode).json(result)

    })

})


// user request resolving
// get request
app.get('/', (req, res) => {
    res.send("GET REQUEST")
})
// post request
app.post('/', (req, res) => {
    res.send("POST REQUEST")
})
// put request
app.put('/', (req, res) => {
    res.send("PUT REQUEST")
})
// patch request
app.patch('/', (req, res) => {
    res.send("PATCH REQUEST")
})
// delete request
app.delete('/', (req, res) => {
    res.send("DELETE REQUEST")
})

// set up the port no.to the server app

app.listen(3000, () => {
    console.log("server is started at 3000");
})

