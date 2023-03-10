// Server creation

//1. import express
const express = require ('express')

//import dataservices
const dataService=require('./services/data.service')

//import cors
const cors= require('cors')

//import jwt
const jwt=require('jsonwebtoken')

//2. create an application using express
const app= express()

//to parse json from request body
app.use(express.json())

//give command to share data via cors
app.use(cors({
    origin:['http://localhost:4200','http://192.168.1.100:8080']
}))

//3. create a port number
app.listen(3000,()=>{
    console.log('listening on port 3000');
})

//Application specific middleware
const appMiddleware=(req,res,next)=>{
    console.log("Application specific middleware");
    next();
}
app.use(appMiddleware)

//Router specific middleware
const jwtMiddleware=(req,res,next)=>{
try{
    console.log("Router specific middleware");

    const token=req.headers['x-access-token']
    const data=jwt.verify(token,'superkey5037')
    console.log(data);
    next();
}
catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:"please login first"
    })
}
    
}

//4. resolving HTTP request
//get, post, put, patch ,delete

//resolving get request
// app.get('/',(req,res)=>{
//     res.send('Get request')
// })


// //post
// app.post('/',(req,res)=>{
//     res.send('Post request')
// }) 

// //put
// app.put('/',(req,res)=>{
//     res.send('Put request')
// })

// //patch
// app.patch('/',(req,res)=>{
//     res.send('Patch request')
// })

// //delete
// app.delete('/',(req,res)=>{
//     res.send('Delete request')
// })



// API request
// registration rqst
app.post('/register',(req,res)=>{
    console.log(req.body);
    dataService.register(req.body.acno,req.body.username,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
    // res.send('register successfully')
})


//login rqst
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
})


//deposit rqst
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
})

//withdrawal rqst
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
})

//transaction rqst
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})

//delete rqst
app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})

app.get('/loandetails',(req,res)=>{
    dataService.loandetails(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })

})