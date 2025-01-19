const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
const app = express();
const router = require('./routes/route');
const cookieParser = require('cookie-parser');
const port = 3020;
const {connectMongoDb} = require('./connection/connection')
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
connectMongoDb('mongodb+srv://saikumarreddypalakolanu6:kgRgy5ZZGc97R1h5@cluster0.b8is1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log("mongodb connected successfully")}).catch((err)=>{console.log(err)});
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(router);
app.listen(port,()=>{
    console.log("server is listening on port" + port);
})