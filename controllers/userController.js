import User from '../model/user.js'
import bcrypt from 'bcrypt'

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
            res.status(400).json({ message: 'name或email或password必須填寫' });
        }
    }catch{
        res.status(400).json({ status: 'fail', message: '創建失敗' });
    }
}