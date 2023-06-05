import User from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//創建用戶================================
export const createUserControllor = async(req,res)=>{
    const{username,email,password} = req.body
    try{
        if (username && email && password) {
            const hashPassword = await bcrypt.hash(password, 10);
            await User.create({
                username,
                email,
                password:hashPassword,
            })
            return res.status(200).json({ status: 'success' });
        }else {
            res.json({ message: 'name或email或password必須填寫' });
        }
    }catch{
        res.status(400).json({ status: 'fail', message: '創建失敗' });
    }
}
//登入用戶================================
export const loginUserControllor = async(req,res)=>{
    const{username,password} = req.body
    try{
        const user = await User.findOne({username:username})
        if(user && await bcrypt.compare(password,user.password)){
            const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '1d' });
            res.cookie('token', token);
            return res.status(200).json({ status: 'success' });
        }else{
            return res.json({ status: 'fail', message: '請輸入正確的帳號或密碼' });
        }
    }catch{
        res.status(500).json({ status: 'fail', message: '未知錯誤' });
    }
}