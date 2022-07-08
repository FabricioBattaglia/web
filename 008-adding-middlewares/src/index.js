const express = require('express');
const app = express();
const {v4: uuidv4} = require('uuid');

app.use(express.json());

const users = [];

function checkExistsUserAccount(request, response, next) {
    const { username } = request.headers;
    const user = users.find((user) => user.username === username);
    if(!user) {
        return response.status(404).json({error: "User not found!"});
    }
    request.username = user;
    return next();
}

function checkTodoAvailability(request, response, next){
    const { username } = request;
    if(username.pro) {
        return next();
    }
    const len = username.todos.length
    if(len >= 10){
        return response.status(400).json({error: "You have reached your to-do limit!"})
    }
    return next();
}

function checkTodoExists(request, response, next){
    const { username } = request;
    const { title, deadline} = request.body;
    const { id } = request.params;
    const todo = username.todos.find((todo) => todo.id === id);
    if(!todo){
        return response.status(404).json({error: "Todo not found"});
    }
    request.todo = todo;
    request.title = title;
    request.deadline = deadline;
    request.id = id;
    return next();
}

function findUserById(request, response, next){
    const { id } = request.params;
    const user = users.find((user) => user.id === id);
    if(!user) {
        return response.status(404).json({error: "User not found!"});
    }
    request.username = user;
    return next();
}

app.post("/users", (request, response) => {
    const { name, username } = request.body;
    const userExist = users.some(user => user.username === username);
    if(userExist){
        return response.status(400).json({error: "This username is already in use"});
    }
    users.push({
        id: uuidv4(),
        name,
        username,
        pro: false,
        todos: []
    });

    return response.status(201).send();
});

app.get("/users/:id", findUserById, (request, response) => {
    const { username } = request;
    return response.json(username)
});

app.patch("/users/:id/pro", findUserById, (request, response) => {
    const { username } = request;
    if(username.pro) {
        return response.status(400).json({error: "This user is already PRO!"});
    }
    username.pro = true;
    return response.json(username);
});

app.get("/todos", checkExistsUserAccount, (request,response) => {
    const { username } = request;
    return response.json(username.todos);
});

app.post("/todos", checkExistsUserAccount, checkTodoAvailability, (request, response) => {
    const { title, deadline} = request.body;
    const { username } = request;
    
    username.todos.push({
        id: uuidv4(),
        title,
        done: false,
        deadline: new Date(deadline),
        created_at: new Date()
    });

    return response.status(201).send();
});

app.put("/todos/:id", checkExistsUserAccount, checkTodoExists, (request, response) => {
    const { title, deadline } = request;
    todo.title = title;
    todo.deadline = new Date(deadline);
    return response.json(todo);
});

app.patch("/todos/:id/done", checkExistsUserAccount, checkTodoExists, (request, response) => {
    const { todo } = request;
    todo.done = true;
    return response.json(todo);
});

app.delete("/todos/:id", checkExistsUserAccount, checkTodoExists, (request, response) => {
    const { username, todo} = request;

    const todoIndex = username.todos.indexOf(todo);

    if(todoIndex === -1) {
        return response.status(404).json({error: "Todo not found"});
    }

    username.todos.splice(todoIndex, 1);

    return response.status(204).send();
});

app.listen(4005);