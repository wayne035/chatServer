import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import jwt from 'jsonwebtoken'

const app = express()
dotenv.config()

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

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (token) {
        jwt.verify(token, process.env.KEY, (err) => {
            if (err) return res.json('token 錯誤');
            next();
        });
    }
    else {
        res.json({ status: 'fail' , message: "請先登入" });
    }
};

app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.mongooseDB)
.then(() => {
    console.log('mongooseDB連接成功');
})
.catch(e => console.log(e.message));

app.use('/api/auth',userRoute)

app.get('/api/user',verifyUser,(req,res)=>{res.send('hi')})

app.listen(POST)