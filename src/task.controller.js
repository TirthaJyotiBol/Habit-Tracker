import TaskRepository from "./task.repository.js";

// make instance for task repository
let taskRepo = new TaskRepository();
export default class TaskController{

    // show index page
    static showIndexPage(req,res){
        res.render('index');
    }

    // show add task page
    static showAddTaskPage(req,res){
        res.render('addtask',{message:null});
    }

    // add task to mongodb
    static async addTask(req,res){
        // months for addition in the database
        const month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
        let task = req.body.task;
        let date = `${new Date().getDate()} ${month[new Date().getMonth()]}`;
        /*
            - status is taken as 0/1/2
              0: none
              1: Done
              2: Not Done
            - By default it is considered as none, user can change the task as per requirements
        */
        let status = 0;
        let previousDays = this.getNextSevenDays(date);
        let addedTask = await taskRepo.addTask(task,date,status,previousDays);
        if(addedTask.success){
            return res.render('addtask',{message:"Habbit Added Successfully"});
        }
        return res.render('addtask',{message:"Sorry ! Your Habbit cannot be added"});
    }

    // display the task page
    static async getTasksPage(req,res){
        // fetch tasks from repository
        let tasks = await taskRepo.getTasks();
        console.log(tasks);
        if(tasks.length>0){
            return res.render('tasks',{tasks:tasks});
        }
        // if no task the simply send null to view
        res.render('tasks',{tasks:null});
    }

    // update the task 
    static async updateTask(req,res){
        let id = req.query.id;
        let task = req.query.task;
        await taskRepo.updateTask(id,task);
        res.redirect('showtasks');
    }

    // delete any particular task
    static async deleteTask(req,res){
        let taskid = req.query.task;
        await taskRepo.deleteTask(taskid);
        // once task is deleted it is being redirected to tasks page
        res.redirect('showtasks');
    }

    // get the previous 7 days and store the data in array in db
    static getNextSevenDays(startDateStr) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dates = [];
        const [day, month] = startDateStr.split(' ');
      
        // get current date and convert it to DD: Month format
        const startDate = new Date();
        startDate.setDate(parseInt(day, 10));
        startDate.setMonth(months.indexOf(month));
      
        // get the previous 7 days to show
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() - i);
          const formattedDate = `${date.getDate()} ${months[date.getMonth()]}`;
          dates.push(formattedDate);          
        }

        let ans = [];

        // initially status is set as 0
        dates.forEach((curr)=>{
            let currDate = {
                date:curr,
                status:'0'
            }
            ans.push(currDate);
        });
      
        return ans;
      }    

    //    show detail about a particular task
    //  TaskName along with 7 day detail for the task is displayed
    static async showDetails(req,res){
        let taskId = req.params.id;
        let taskName = await taskRepo.getTaskByID(taskId);
        let details = await taskRepo.getDetails(taskId);
        res.render('detail',{detail:details,taskname:taskName});
    }

    // set the task to done/notdone and none for a day
    static async activeTask(req,res){
        let taskid = req.query.taskid;
        let id = req.query.id;
        let taskStatus = req.query.status;
        let date = req.query.date;
        await taskRepo.activeTask(id,taskid,taskStatus,date);
        res.redirect('details/'+taskid);
    }

}