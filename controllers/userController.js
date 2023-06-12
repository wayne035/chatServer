import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//創建用戶================================
export const createUserControllor = async(req,res)=>{
    const{username,email,password} = req.body;
    try{
        const user = await User.findOne().or([{ username }, { email }]).select('username email');
        if (user) {
            if (user.email === email) return res.json({ status: 'fail', message: 'e-mail已被使用' });
            if (user.username === username) return res.json({ status: 'fail', message: '使用者名稱已被使用' });
        }
        if(username.length >= 10) return res.json({ status: 'fail',message:'使用者名稱超過10個字'});
        if(username && email && password) {
            const hashPassword = await bcrypt.hash(password, 10);
            await User.create({
                username,
                email,
                password:hashPassword,
            });
            return res.json({ status: 'success',message:'創建成功' });
        }else {
            return res.json({ message: 'name或email或password必須填寫' });
        }
    }catch{
        return res.status(500).json({ status: 'fail', message: '創建失敗' });
    }
}
//登入用戶================================
export const loginUserControllor = async(req,res)=>{
    const{username,password} = req.body;
    try{
        const user = await User.findOne({username:username})
        if(user && await bcrypt.compare(password,user.password)){
            const token = jwt.sign({ username,id:user._id }, process.env.KEY, { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ status: 'success',message:'登入成功'});
        }else{
            return res.json({ status: 'fail', message: '請輸入正確的帳號或密碼' });
        }
    }catch{
        return res.status(500).json({ status: 'fail', message: '讀取失敗' });
    }
}
//登出用戶================================
export const logoutUserControllor = async(req,res)=>{
    res.clearCookie('token')
    return res.json({status:'success', message: '登出成功' })
}