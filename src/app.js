import dotenv from 'dotenv';
import express from "express";
dotenv.config();
const app = express();
import bodyParser from 'body-parser';
import DB from './db.js';

import userRoute  from './routes/user.route.js';
DB.connect();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', userRoute);

app.get('/health', (req, res)=>{
    res.status(200).json({
        message: " Server is running"
    });
});

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('Server started');
})