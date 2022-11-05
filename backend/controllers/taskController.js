const Task = require("../model/taskModel");

const createTask = async (req, res) => {

    try {
        const task = await Task.create(req.body)
        res.json(task)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}


const getTasks= async (req, res) => {

    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}


const getTask = async (req, res) => {
    try {
    const {id} = req.params
    if(!task) {
        return res.status(404).json(`No task with id ${id} found`)
    }
    const task = await Task.findById(id)
    res.status(200).json(task)        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }

}

// delete task

const deleteTask = async(req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id)
        if(!task) {
            return res.status(404).json(`No task with id ${id} found`)
        }
        res.status(200).send("Task deleted")
    } catch (error) {
        res.status(500).json({message: error.message})

        
    }

}



// update a task
const updateTask = async(req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate({
            _id: id
        }, req.body, {new: true, runValidators: true})

        if(!task) {
            return res.status(404).json(`No task with id ${id} found`)
        }
        res.status(200).json(task)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}


module.exports = { createTask, getTasks, getTask, deleteTask, updateTask }