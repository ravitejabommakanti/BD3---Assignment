const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const tasks = require('./mockData');

const app = express();
const port = 3000;

app.use(express.static('static'));

// Endpoint 1. Add a Task to the Task List
// <http://localhost:3000/tasks/add?taskId=4&text=Review%20code&priority=1>

function addNewTaskToTasks(tasks, task) {
  tasks.push(task);
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = req.query.taskId;
  let text = req.query.text;
  let priority = req.query.priority;
  let newTask = { taskId: taskId, text: text, priority: priority };
  let updatedTasks = addNewTaskToTasks(tasks, newTask);
  res.json({ tasks: updatedTasks });
});

// Endpoint 2. Read All Tasks in the Task List
// <http://localhost:3000/tasks>

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

// Endpoint 3. Sort Tasks by Priority
// <http://localhost:3000/tasks/sort-by-priority>

function sortTasksByPriority(tasks) {
  const sortedTasks = tasks.sort((a, b) => a.priority - b.priority);
  return sortedTasks;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let updatedTasks = sortTasksByPriority(tasks);
  res.json({ tasks: updatedTasks });
});

// Endpoint 4. Edit Task Priority
// <http://localhost:3000/tasks/edit-priority?taskId=1&priority=1>
function editTaskPriority(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
      break;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let updatedTasks = editTaskPriority(tasks, taskId, priority);
  res.json({ tasks: updatedTasks });
});

// Endpoint 5. Edit/Update Task Text
// <http://localhost:3000/tasks/edit-text?taskId=3&text=Update%20documentation>

function editTaskText(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
      break;
    }
  }
  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let updatedTasks = editTaskText(tasks, taskId, text);
  res.json({ tasks: updatedTasks });
});

// Endpoint 6. Delete a Task from the Task List
// <http://localhost:3000/tasks/delete?taskId=2>

function deleteTaskById(tasks, taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks.splice(i, 1);
      break;
    }
  }
  return tasks;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let updatedTasks = deleteTaskById(tasks, taskId);
  res.json({ tasks: updatedTasks });
});

// Endpoint 7. Filter Tasks by Priority
// <http://localhost:3000/tasks/filter-by-priority?priority=1>
function filterByPriority(tasks, priority) {
  const filteredTasks = tasks.filter((task) => task.priority === priority);
  return filteredTasks;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let updatedTasks = filterByPriority(tasks, priority);
  res.json({ tasks: updatedTasks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
