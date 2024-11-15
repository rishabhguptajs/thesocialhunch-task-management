import mongoose from "mongoose";

const tashSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const Task = mongoose.model("Task", tashSchema);

export default Task;