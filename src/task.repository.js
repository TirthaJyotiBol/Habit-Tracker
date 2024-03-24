import TaskModel from "./task.schema.js";
import dateModel from "./days.schema.js";
import connect from "./config.mongo.js";

// Task Repository for performing the database task related operations
export default class TaskRepository{

    // add a new Task
    async addTask(task,date,status,dates){
        try{
            let newTask = new TaskModel({task,date,status});
            await newTask.save();
            let taskId = newTask._id;
            let newDate = new dateModel({taskId,dates});
            await newDate.save();
            return {
                'success':true
            };
        }
        catch(err){
            console.log(err);
            return {
                'success':false
            };
        }
    }

    // fetch all the tasks from a databse and display it on a page
    async getTasks(){
        try{
            let allTasks = await TaskModel.find();
            return allTasks;
        }
        catch(err){
            console.log(err);
        }
    }

    async updateTask(taskid, status) {
        try {
            let task = await TaskModel.findOne({ _id: taskid });
            if (task) {
                task.status = status;
                await task.save();
                console.log('Task updated successfully');
            } else {
                console.log('Task not found');
            }
        } catch (err) {
            console.error('Error updating task:', err);
        }
    }

    async deleteTask(taskId) {
        try {
            await TaskModel.deleteOne({ _id: taskId });
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    }

    async getTaskByID(taskid){
        try{
            let taskName = await TaskModel.findOne({_id:taskid});
            return taskName;
        }
        catch(err){
            console.log(err);
        }
    }

    async getDetails(taskid){
        try{
            let taskDetail = await dateModel.findOne({taskId:taskid});
            let detailArray = await taskDetail.dates;
            return detailArray;
        }
        catch(err){
            console.log(err);
        }
    }

    async activeTask(dateid, taskid, status, date) {
        try {
            let getTaskInDates = await dateModel.findOne({ taskId: taskid });
            let dates = await getTaskInDates.dates;
            let updateDateStatus = dates.find((curr) => {
                return curr.date == date;
            });
    
            if (updateDateStatus) {
                console.log(`Updated ${date} from ${updateDateStatus.status} to ${status}`);
                updateDateStatus.status = status; // Update status directly
                await getTaskInDates.save(); // Save the parent document
            }
        } catch (err) {
            console.log(err);
        }
    }
    

}