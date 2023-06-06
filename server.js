import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import dataRoute from './routes/dataRoute.js'
import jwt from 'jsonwebtoken'

const app = express();
dotenv.config();

const POST = process.env.POST || 8000;

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
});

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.KEY, (err,decoded) => {
            if (err){
                return res.json('token 錯誤');
            }else{
                req.username = decoded.username;
                next();
            }
        });
    }
    else {
        res.json({ status: 'fail' , message: "請先登入" });
    }
};

mongoose.connect(process.env.mongooseDB)
.then(() => {
    console.log('mongooseDB連接成功');
})
.catch(e => console.log(e.message));

app.use('/api/auth',userRoute);

app.use('/api/userdata',verifyUser,dataRoute);

app.listen(POST);