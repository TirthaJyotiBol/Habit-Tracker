import mongoose from "mongoose";

// uri to connect mongodb with compass and atlas
let uri = `mongodb+srv://tirthabol555:Tirtha555%40@cluster0.iyguytz.mongodb.net/`;

let connect = async () =>{
    try{
        // connection of mongodb with ATLAS
        await mongoose.connect(uri);
        console.log("Mongoose Connected to habit database");
    }
    catch(err){
        return err;
    }
}

export default connect;