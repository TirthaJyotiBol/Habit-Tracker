import Express from "express";
import TaskController from "./task.controller.js";

const taskRouter = Express.Router();

//  show the home page
taskRouter.get('/',(req,res)=>{
    TaskController.showIndexPage(req,res);
});

// get the Task Page
taskRouter.get('/addtask',(req,res)=>{
    TaskController.showAddTaskPage(req,res);
});

// on click to this addition of a new task in database takes place
taskRouter.post('/addtask',(req,res)=>{
    TaskController.addTask(req,res);
});

// get tasks page
taskRouter.get('/showTasks',(req,res)=>{
    TaskController.getTasksPage(req,res);
});


// update status
taskRouter.get('/updatetask',(req,res)=>{
    TaskController.updateTask(req,res);
});

// delete task
taskRouter.get('/delete',(req,res)=>{
    TaskController.deleteTask(req,res);
});

taskRouter.get('/details/:id',(req,res)=>{
    TaskController.showDetails(req,res);
});

taskRouter.get('/activate',(req,res)=>{
    TaskController.activeTask(req,res);
})

export default taskRouter;