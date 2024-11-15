import Task from '../models/taskModel.js';

const getTasks = async(req, res) => {
    try {
        const tasks = await Task.find()
        if(tasks.length > 0) {
            res.status(200).json(tasks)
        } else { 
            res.status(404).json({message: 'No tasks found' })
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createTask = async(req, res) => {
    try {
        const { title, description } = req.body

        const task = new Task({
            title,
            description
        })

        await task.save()

        res.status(201).json({
            message: 'Task created successfully',
            task
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateTask = async(req, res) => {
    try {
        const { title, description } = req.body;
        const task = await Task.findById(req.params.id);

        if (task) {
            if (title) {
                task.title = title;
            }
            if (description) {
                task.description = description;
            }

            await task.save();

            res.status(200).json({
                message: 'Task updated successfully',
                task
            });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteTask = async(req, res) => {
    try {
        const taskID = req.params.id;

        const task = await Task.findByIdAndDelete(taskID);

        if (task) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { getTasks, createTask, updateTask, deleteTask };