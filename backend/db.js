const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{       
        console.log("connected to mongo suucessfully");
    })
}
module.exports=connectToMongo; /* for exporting this function outside*/
/*.mongoose.connect() function takes a string which is mongoURI for connection and a function  where  u can return anything*/                                           