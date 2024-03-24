import mongoose from "mongoose";

let pass = 'Tirtha555@';
let uri = `mongodb+srv://tirthabol555:${pass}@cluster0.iyguytz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/habit`;

// let uri = `mongodb://127.0.0.1:27017/habit`;

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