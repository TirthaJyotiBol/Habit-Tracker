import mongoose from "mongoose";

let uri = `mongodb://127.0.0.1:27017/habit`;

let connect = async () =>{
    try{
        await mongoose.connect(uri);
        console.log("Mongoose Connected to habit database");
    }
    catch(err){
        return err;
    }
}

export default connect;