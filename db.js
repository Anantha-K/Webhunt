import mongoose from "mongoose";

const connect =async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
        });
        console.log("Connection Successful");
    }catch(error){
        throw new error ("Error");
    }
}

export default connect;