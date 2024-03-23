import mongoose from "mongoose";

let TaskSchema = mongoose.Schema({
    task:{type:String,require:true},
    date:{type:String,require:true},
    status:{type:String,require:true},
    // days: [
    //     {
    //         date: { type: String, require: true },
    //         status: { type: String, require: true,default: '0' }
    //     }
    // ]
});


let TaskModel = mongoose.model('tasks',TaskSchema);
export default TaskModel;