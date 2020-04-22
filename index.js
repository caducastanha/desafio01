const express = require('express');

const server = express();

server.use(express.json());

let requestCounter = 0;

server.use((req, res, next) => {
    requestCounter += 1;
    console.log(requestCounter);
    next();
})

projects = [];

function checkProjectExist(req, res, next) {
    const { id } = req.params;

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id == id) {
            next();
        }
    }

    return res.status(400).json({ error: "Project does not exist" });
}

server.post('/projects', (req, res) => {
    const { id, title } = req.body;
    const tasks = [];

    projects.push({
        id, title, tasks
    });

    return res.json({ projects });
})

server.get('/projects', (req, res) => {
    return res.json({ projects });
})

server.put('/projects/:id', checkProjectExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    let project;

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id == id) {
            projects[i].title = title;
            project = projects[i];
            break;
        }
    }

    return res.json({ project });
})

server.delete('/projects/:id', checkProjectExist, (req, res) => {
    const { id } = req.params;

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id == id) {
            projects.splice(i, 1);
            break;
        }
    }

    return res.json({ message: "Projeto deletado com sucesso." });
})

server.post('/projects/:id/tasks', checkProjectExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    let project;
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id == id) {
            projects[i].tasks.push(title);
            project = projects[i];
            break;
        }
    }

    return res.json({ project });
})

server.listen(3000);