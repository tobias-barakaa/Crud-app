const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb