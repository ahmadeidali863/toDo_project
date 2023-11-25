// index.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//MongoDB connection
mongoose.connect('mongodb://127.0.0.1/toDoDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define MongoDB Schema
const Schema = mongoose.Schema;
const columnSchema = new Schema({
    status: String,

});

// const subtaskSchema = new Schema({
//     title: String,
//   });

// const tasksSchema = new Schema({
//     Title: String,
// Description: String,
// Subtasks: [subtaskSchema],
//  Progressbar : Number ,
//  Status : String
  

// });

const Column = mongoose.model('toDoColumns', columnSchema);
//const Task = mongoose.model('toDoColumns', tasksSchema);

// Routes
// Get all columns
app.get('/api/columns', async (req, res) => {
    try {
        const columns = await Column.find().maxTimeMS(20000);
        res.json(columns);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// add column
app.post('/api/columns',  (req, res) => {
        const column = new Column(req.body);
         column.save();
        res.json(column);
      });

  
//   // Get all tasks
//   app.get('/tasks', async (req, res) => {
//     const tasks = await Task.find();
//     res.json(tasks);
//   });
  
//   // Create a new task
//   app.post('/tasks', async (req, res) => {
//     const task = new Task(req.body);
//     await task.save();
//     res.json(task);
//   });
  
//   // Update a task
//   app.put('/tasks/:id', async (req, res) => {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }
//     task.Title = req.body.Title;
//     task.Description = req.body.Description;
//     task.Progressbar = req.body.Progressbar;
//     task.Status = req.body.Status;
//     await task.save();
//     res.json(task);
//   });
  
//   // Add a subtask to a task
//   app.put('/tasks/:id/subtasks', async (req, res) => {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }
//     const subtask = new Subtask(req.body);
//     task.Subtasks.push(subtask);
//     await task.save();
//     res.json(task);
//   });
  
// // Delete a column
// app.delete('/api/columns/:id', async (req, res) => {
//     try {
//         await Column.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Column deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});