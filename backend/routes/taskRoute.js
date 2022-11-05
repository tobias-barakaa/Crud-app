const express = require("express");
const { getTasks, createTask, getTask, deleteTask, updateTask } = require("../controllers/taskController");
const Task = require("../model/taskModel")

const router = express.Router();


router.post("/", createTask)

// router.route("/").get(getTasks).post(createTask)
// router.route("/:id").delete(deleteTask).get(getTask).put(updateTask)


router.get("/", getTasks)
router.get("/:id", getTask)
router.delete("/:id", deleteTask)
router.put("/:id", updateTask)




module.exports = router