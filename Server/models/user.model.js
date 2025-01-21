import mongoose,{Schema} from "mongoose"

const userSchema = new Schema({
    name:{
        type:String,
        trim:'true',
        required:true
    },
    social:{
        type:String,
        trim:'true',
        required:true,
    },
    images:[
        {
            public_id:{
                type:String,
            },
            secure_url:{
                type:String,
            }
        }
    ]
},{
    timestamps:true,
})


const UserModel = mongoose.model('users',userSchema)
export default UserModel