const { query } = require('express');
const express = require('express');
const app = express();
const { Pool } = require('pg');
require('dotenv').config();
const port = 8080;

app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error("Erreur de connexion", err);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Erreur lors du SELECT', err);
        }
        console.log('Connexion réussie ! Heure du serveur :', result.rows[0].now);
    });
});



app.get('/', (req, res) =>{
    res.send('hello');
});

app.get('/tasks', (req, res) =>{
    const result = pool.query('SELECT * FROM tasks');
    result.then(function(result){
        res.status(200).json(result);
    })
});

app.post('/tasks', (req, res) =>{
    const { title, status } = req.body;
    const result = pool.query('INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *', [title, status]);
    result.then(function(result){
        res.status(200).json(result.rows[0]);
    })
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