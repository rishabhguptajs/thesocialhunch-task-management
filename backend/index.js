import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

app.use('/api/tasks', taskRoutes);

app.get('/' , (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});