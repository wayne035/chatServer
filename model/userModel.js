import {Schema,model} from "mongoose"

const userSchema = new Schema({
    username: {
        type: String,
        require: [true, '名字必須填寫'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email 必須填寫'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        minLength: 10,
        required: [true, '密碼必須填寫或大於10個字'],
        trim: true,
    },
}, { timestamps: true });

export default model('user', userSchema);
