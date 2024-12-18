const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = require('./routes/route');
const cookieParser = require('cookie-parser');
const port = 3020;
const {connectMongoDb} = require('./connection/connection')
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
connectMongoDb('mongodb://localhost:27017/wardrobe-wonder').then(()=>{console.log("mongodb connected successfully")}).catch((err)=>{console.log(err)});
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(router);
app.listen(port,()=>{
    console.log("server is listening on port" + port);
})