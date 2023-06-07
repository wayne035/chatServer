import User from '../model/userModel.js'
import Message from '../model/messageModel.js'

//找尋不包含自己id的資料===============================
export const getUserControllor = async(req,res)=>{
    try{
        const users = await User.find({ username: { $ne: req.username }})
        .select(['username','_id']);
        return res.json({users,self:[{name:req.username,id:req.id}]});
    }catch{
        return res.status(500).json({ status: 'fail', message: '讀取失敗' });
    }
}
//取得message===============================
export const getMessageControllor = async(req,res)=>{
    try{
        const {from ,to} = req.body
        const messages = await Message.find({users:{$all:[from,to],}})
        .sort({updatedAt:1})
        const allMessages = messages.map(msg=>{
            return {
                fromSelf: msg.sender.toString() === from,
                message:msg.message.text,
            }
        });
        res.json(allMessages);
    }catch{
        return res.status(500).json({ status: 'fail', message: '讀取失敗' });
    }
}
//儲存message===============================
export const addMessageControllor = async(req,res)=>{
    try{
        const {from , to , message} = req.body;
        if(from && to && message){
            await Message.create({
                message:{text:message},
                users:[from , to ],
                sender:from,
            });
        }else{
            return res.json({ status: 'fail', message: '創建失敗' });
        }
    }catch{
        return res.status(500).json({ status: 'fail', message: '讀取失敗' });
    }
}