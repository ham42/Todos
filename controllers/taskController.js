const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const Task = require('../models/taskModel');
const { findByIdAndUpdate } = require('../models/userModel');

// Create a Task
exports.createTask = catchAsyncError(async (req, res, next) => {

    const {title, description, priority, time} = req.body;
    const requestBody = {title, description, priority, time};

    requestBody.user = req.user.id;

    const task = await Task.create(requestBody);

    res.status(201).json({
        success: true,
        task
    })

});


// Get all Tasks
exports.getTasks = catchAsyncError(async (req, res, next) => {

    const tasks = await Task.find({user: req.user.id});

    tasks.forEach((task) => {
        if(task.status === 'Pending'){
            if(task.time.toDateString() < Date.now()){
                task.status = 'Uncompleted';
                task.save();
            }
        }
    });

    res.status(201).json({
        success: true,
        tasks
    });
});


// Delete a Task
exports.deleteTask = catchAsyncError(async (req, res, next) => {

    const task = await Task.findById(req.params.id);
    if(!task){
        return next(new ErrorHandler('Task not Found', 404));
    }

    await task.remove();

    res.status(201).json({
        success: true,
        message: 'Task deleted Successfully'
    });

});


// Update a Task
exports.updateTask = catchAsyncError(async (req, res, next) => {
    
    const {title, description, priority, time, status} = req.body;
    const requestBody = {title, description, priority, time, status};

    let task = await Task.findOne({_id:req.params.id, user: req.user.id});
    if(!task){
        return next(new ErrorHandler('Task not Found', 404));
    }

    if(task.status === 'Uncompleted' || task.status === 'Completed'){
        return next(new ErrorHandler('Completed / Uncompleted cannot be Updated', 401));
    }

    task = await Task.findByIdAndUpdate(req.params.id, requestBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        task
    });
});



// Get all Tasks --Admin
exports.getAllTasks = catchAsyncError(async (req, res, next) => {

    const tasks = await Task.find();

    res.status(200).json({
        success: true,
        tasks
    })
});


// Update Task --Admin
exports.remarkTask = catchAsyncError(async (req, res, next) => {

    const {remarks} = req.body;
    let task = await Task.findById(req.params.id);
    if(!task){
        return next(new ErrorHandler('Task not Found with given Id', 404));
    }
    
    task.remarks = remarks;
    task.save();

    res.status(200).json({
        success: true,
        task
    })
})