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
        todos: []
    });

    return response.status(201).send();
});

app.get("/todos", checkExistsUserAccount, (request,response) => {
    const { username } = request;
    return response.json(username.todos);
});

app.post("/todos", checkExistsUserAccount, (request, response) => {
    const { title, deadline} = request.body;
    const { username } = request;
    /*const todo = {
        id: uuidv4(),
        title,
        done: false,
        deadline: new Date(deadline),
        created_at: new Date()
    }
    username.todos.push(todo);
    */
    
    username.todos.push({
        id: uuidv4(),
        title,
        done: false,
        deadline: new Date(deadline),
        created_at: new Date()
    });

    return response.status(201).send();
});

app.put("/todos/:id", checkExistsUserAccount, (request, response) => {
    const { username } = request;
    const { title, deadline} = request.body;
    const { id } = request.params;
    const todo = username.todos.find((todo) => todo.id === id);
    if(!todo){
        return response.status(404).json({error: "Todo not found"});
    }
    todo.title = title;
    todo.deadline = new Date(deadline);
    return response.json(todo);
});

app.patch("/todos/:id/done", checkExistsUserAccount, (request, response) => {
    const { username } = request;
    const { id } = request.params;
    const todo = username.todos.find(todo => todo.id === id);
    if(!todo){
        return response.status(404).json({error: "Todo not found"});
    }
    todo.done = true;
    return response.json(todo);
});

app.delete("/todos/:id", checkExistsUserAccount, (request, response) => {
    const { username } = request;
    const { id } = request.params;

    const todoIndex = username.todos.findIndex(todo => todo.id === id);

    if(todoIndex === -1) {
        return response.status(404).json({error: "Todo not found"});
    }

    username.todos.splice(todoIndex, 1);

    return response.status(204).send();
});

app.listen(4005);