# Project 2: To-do API

### Requirements:
-   Account creation;
-   To-do creation;
-   Get to-do;
-   Alter to-do deadline and title;
-   Set to-do as done;
-   Delete to-do;

### Rules:
-   Account is created with name, username, uuid, and an empty to-do array;
-   One account per username;
-   A to-do is created with uuid, title, done (false), deadline, created at;
-   It must not be possible to create a user with a username that is already in use;
-   It must not be possible to update a to-do that does not exist;
-   It must not be possible to delete a to-do that does not exist;
-   Deadline must be on format YYYY-MM-DD;

# API documentation:

## Routes:

### POST/users
This route should create a new user.
-   Body:
```json
{
    "name": "Fabricio",
    "username": "fsbattaglia"
}
```

### POST/todos
This route should create a new to-do for that user.
-   Header: username;
-   Body:
```json
{
    "title": "new todo1",
    "deadline": "2022-07-07"
}
```

### GET/todos
This route should fetch all to-dos for that user.
- Header: username;

### PUT/todos/{to-do id}
This route is to update a to-do title and deadline.
-   Header: username;
-   Body:
```json
{
    "title": "new todo1",
    "deadline": "2022-07-07"
}
```

### PATCH/todos/{to-do id}/done
This route should set a to-do to done.
-   Header: username;

### DELETE/todos/:id
This route should delete a to-do.
-   Header: username;

# Project solution:

```javascript
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
```