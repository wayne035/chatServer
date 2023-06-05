import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

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

app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.mongooseDB)
.then(() => {
    console.log('mongooseDB連接成功');
})
.catch(e => console.log(e.message));


app.get('/',(req,res)=>{
    res.send('hi')
})

app.listen(8000)