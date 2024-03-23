import mongoose from "mongoose";

let dateSchema = mongoose.Schema({
    taskId: {
        type:mongoose.Types.ObjectId,
        ref:'tasks'
    },
    dates:[
        {
            status:{type:String,require:true,default:'0'},
            date:{type:String,require:true}
        }
    ]
});

let dateModel = mongoose.model('date',dateSchema);
export default dateModel;