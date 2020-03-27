const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(cors());

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "family"
})

db.connect(function (err) {
    if (err) throw err;
    console.log("DB Connected!");
});

let Query = (q, ...p) => {
    return new Promise((resolve, rej) => {
        db.query(q, p, (err, result) => {
            if (err) {
                rej(err)
            } else {
                resolve(result)
            }
        })
    })
}
//get all persons list
app.get('/persons', async (req, res) => {
    try {
        let b = await Query(`SELECT * FROM family.persons;`);
        res.json(b)
    } catch (err) {
        res.send(500, "opss..")
        throw err
    }
})

// get all tasks with owner task:
app.get('/tasks', async (req, res) => { 
    try {
        let b = await Query(`SELECT tasks.id, tasks.task_description, date, tasks.finished, persons.name 
        FROM tasks
        inner join persons
        on persons.id = tasks.person_id`);
        res.json(b)
    } catch(err){
        res.send(500, "opss..")
        throw err
    }
})

// add task:
app.post("/tasks", async (req, res) => {
    try {
        let { task_description, person_id } = req.body
                let q = `INSERT INTO tasks (task_description, person_id)
                VALUES ("${task_description}", ${person_id})`
        let b = await Query(q)
        res.send(201)
    } catch(err){
        res.send(500, "opss..")
        throw err
    }
})

// update if tasks completed

app.put("/tasks/isFinish", async (req, res) => {
    try {
        let { id, finished } = req.body
        let q = `UPDATE tasks
        SET finished = ${finished}
        WHERE id = ${id}`
        let b = await Query(q)
        res.send(204, 'succesfully updated')
    } catch (err) {
        res.send(500, "opss..")
        throw err
    }
})

//delete tasks:
app.delete("/tasks/:id", async (req, res) => {
    try {
        let q = `DELETE FROM tasks
        WHERE id = ?;`
        let b = await Query(q, req.params.id)
        res.send(204, 'deleted')
    } catch (err) {
        res.send(500, "opss..")
        throw err
    }
})

app.listen(1005, () => console.log('server is up'))
