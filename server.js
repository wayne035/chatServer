import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import dataRoute from './routes/dataRoute.js'
import jwt from 'jsonwebtoken'
import { Server } from 'socket.io';

const app = express();
dotenv.config();

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
});

app.use(cors({
    origin: process.env.ClientUrl,
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
                req.id = decoded.id;
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

const server = app.listen(process.env.POST);

const io = new Server(server,{
    cors:{
        origin: process.env.ClientUrl,
        credentials: true,
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("addUser", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("sendMsg",(data) => {
      const sendUserSocket = onlineUsers.get(data['to']);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msgRecieve", data.msg);
      }
    });
});