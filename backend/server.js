const express = require("express");
const connectDb = require("./config/connectDb");
const Task = require("./model/taskModel");
const dotenv = require("dotenv").config();
const taskRoutes = require("./routes/taskRoute")
const cors = require("cors")

const app = express();



connectDb();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
///// cors
app.use(cors({
    origin: ["http://localhost:3000", "https://mern-stack-app.onrender.com"]
}))

// create a Task


// Routes / Tasks
app.use("/api/tasks", taskRoutes)





const PORT = process.env.PORT  || 5000

const startServer = async () => {
    try {
        await connectDb();

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

    } catch (error) {

        console.log(error)
        
    }
}

startServer();