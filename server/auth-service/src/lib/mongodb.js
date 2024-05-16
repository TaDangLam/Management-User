import mongoose from "mongoose";

const MongoConnect = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
        }) 
        console.log("Auth Service Connected is Successfully");
    }catch(error){
        console.log(error);
    }
}

export default MongoConnect;
