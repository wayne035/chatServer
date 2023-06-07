import User from '../model/user.js'

export const getUserControllor = async(req,res)=>{
    try{
        //找尋不包含自己id的資料
        const users = await User.find({ username: { $ne: req.username }})
        .select(['username','_id']);
        return res.json({users,self:req.username});

    }catch{
        return res.status(400).json({ status: 'fail', message: '讀取失敗' });
    }
}
