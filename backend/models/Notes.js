const mongoose=require('mongoose');
const {Schema}=mongoose;
const NotesSchema=new Schema({
    user:{
       type:mongoose.Schema.Types.ObjectId,//so basically this user is defined as a foriegn key and its reference is    taken from the 'user' collection present in our mongo db database
       ref:'user'
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true ,
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('notes',NotesSchema);
