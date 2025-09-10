const { query } = require('express');
const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

let tasks = [{id: 0, title: "test", status: false} ,{id: 1, title: "lorem ipsum", status: false}];
let id = 0;

app.get('/', (req, res) =>{
    res.send('hello');
});

app.get('/tasks', (req, res) =>{
    res.json(tasks);
});

app.post('/tasks', (req, res) =>{
    const { title, status } = req.body;
    const newTask = {
        id: tasks.length > 0 ?
        tasks[tasks.length - 1].id + 1 : 1,
        title,
        status: status || false,
    };
        tasks.push(newTask);
        res.status(200).json(newTask);
})

app.put('/tasks/:id', (req, res) =>{
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);

    if(!task) {
        res.status(404).json({message: "Task not found"});
        return
    }

    const { title, status } = req.body;
    if (title !== undefined) task.title = title;
    if (status !== undefined) task.status = status;

    res.json(task);
});

app.delete('/tasks/:id', (req, res) =>{
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex((t) => t.id === taskId);

    if( index === -1) {
        res.status(404).json({message: "Task not found"});
        return
    }

    const deletedTask = tasks.splice(index, 1);
    res.status(200).json(deletedTask, {message: "Task succesfully deleted"});


})

app.listen(port, () =>{
    console.log(`The server is online and ready at http://localhost:${port}`);
});