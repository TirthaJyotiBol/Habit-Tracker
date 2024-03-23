import Express from "express";
import path from 'path';
import connect from "./src/config.mongo.js";

import taskRouter from "./src/task.routes.js";

const app = Express();

app.use(Express.json());

// for form submission
app.use(Express.urlencoded({extended:true}));


// set public folder as direct
app.use(Express.static('public'));

// use EJS as view engine
app.set('view engine','ejs');
app.set('views',path.join(path.resolve(),'public','views'));


// get task routes
app.use('/',taskRouter);


// run server at 8500
app.listen(8500,async (err)=>{
    // if on running server face any issue the log the error
    if(err){
        console.log("Error: "+err);
    }
    else{
        // if donot get any error then simply
        // connect to database and display the message
        await connect();
        console.log(`Server listening to port ${8500}`);
    }
})