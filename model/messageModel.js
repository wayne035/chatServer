import {Schema,model} from "mongoose"

const messageSchema = new Schema({
   message:{
        text:{
            type:String,
            required:true,
            trim: true,
        }
    },
    users:Array,
    sender:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
}, { timestamps: true });

export default model('message', messageSchema);
