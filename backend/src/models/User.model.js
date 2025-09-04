import {mongoose,Schema} from "mongoose";


const userSchema = new Schema ({

    username: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        min: 0,
        required: true
    }
},{timestamps:true})

const User =mongoose.model("User",userSchema)

export default User;