import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Task from "./Task";
import TaskForm from "./TaskForm";
import axios from "axios";
import loadingImage from "../asset/load.png";

// http://localhost:5000/api/tasks

const URL = process.env.REACT_APP_SERVER_URL;

const TaskList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/tasks");
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    if (name === "") {
      return toast.error("Input field cannot be empty");
    }

    try {
      await axios.post("/api/tasks", formData);
      toast.success("Task added successfully");
      setFormData({ ...formData, name: "" });
      getTasks()
    } catch (error) {
      toast.error(error.message);
    }
  };

  // delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const cTask = tasks.filter((task) => {
        return task.completed === true
    })
    setCompletedTasks(cTask)
  }, [tasks])

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskId(task._id);
    setIsEditing(true);
  };

  const updateTask = async(e) => {
    e.preventDefault()
    if(name === "") {
        return toast.error("Input filed cannot be empty")
    }

    try {
        await axios.put(`/api/tasks/${taskId}`, formData )
        setFormData({...formData, name: ""})
        setIsEditing(false)
        getTasks()
    } catch (error) {
        toast.error(error.message)
    }

  }


  const setToComplete = async(task) => {
    const newFormData = {
        name: task.name,
        completed: true
    }

    try {
        await axios.put(`/api/tasks/${task._id}`, newFormData)
        getTasks()
    } catch (error) {
        toast.error(error.message)
    }
  }

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
          <div className="--flex-between --pb">
          <p>
            <b>Total Tasks:</b> {tasks.length}
          </p>
          <p>
            <b>completed Tasks Tasks:</b> {completedTasks.length}
          </p>
        </div>

      )}
    
      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImage} alt="loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No task added. Please </p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
                
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
