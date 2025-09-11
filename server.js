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

app.get('/tasks', (req, res) => {
    pool.query('SELECT * FROM tasks')
        .then(result => res.status(200).json(result.rows))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "internal server error" });
        });
});

app.post('/tasks', async (req, res) => {
    const { title, status } = req.body;
    try {
        const check = await pool.query('SELECT title FROM tasks WHERE title = $1', [title]);
        if (check.rows.length > 0) {
            return res.status(400).json({ message: "task already exists" });
        }
        const insert = await pool.query(
            'INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *',
            [title, status]
        );
        res.status(201).json(insert.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "internal server error" });
    }
});

app.put('/tasks/:id', async (req, res) => {
    const taskId = parseInt(req.params.id);

    try {
        const taskResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
        if (taskResult.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        const { title, status } = req.body;
        if (title !== undefined) {
            await pool.query('UPDATE tasks SET title = $1 WHERE id = $2', [title, taskId]);
        }
        if (status !== undefined) {
            await pool.query('UPDATE tasks SET status = $1 WHERE id = $2', [status, taskId]);
        }

        res.status(200).json({ message: "Task successfully updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.delete('/tasks/:id', async (req, res) =>{
    const taskId = parseInt(req.params.id);
    
    const taskResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
    if (taskResult.rows.length === 0) {
        return res.status(404).json({ message: "Task not found" });
    }

    await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
    res.status(200).json({ message: "Task successfully deleted" });

})

app.listen(port, () =>{
    console.log(`The server is online and ready at http://localhost:${port}`);
});