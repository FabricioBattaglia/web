# Enhancing Hello World
Now we can add other HTTP methods to add other functionalities to our server. We have already used the GET method, now we can try others. As a reminder, these are the HTTP methods:
- POST: Send new info to the server;
- PUT: Update info in the server;
- PATCH: Specific info to be updated in the server;
- DELETE: Self explanatory;

We will create examples of each using the code from the hello world application that we have previously developed:

```javascript
const express = require('express');

const app = express(); 

app.get("/people", (request, response) ==> {
  return response.json(["Jonh", "Isaac", "Robert", "Julia", "Anna"]);
}); 

app.post("/people", (request, response) ==> {
  return response.json(["Jonh", "Isaac", "Robert", "Julia", "Anna", "James"]);
});

app.put("/people/:id", (request, response) ==> {
  return, response.json(["Jonhster", "Isaac", "Robert", "Julia", "Anna", "James"]);
});

app.patch("/people/:id", (request, response) ==> {
  return, response.json(["Jonhster", "Isaacson", "Robert", "Julia", "Anna", "James"]);
});

app.delete("/people/:id", (request, response) ==> {
  return, response.json(["Jonhster", "Isaacson", "Julia", "Anna", "James"]);
});

app.listen(4004);
```

We will see what ":id" is and how it will refer to one of the names. But for now, this is a great example on how to write simple HTTP routes using node.js and express.js. It is important to see that our functions just return a json with information inside, but we are not manipulating any data yet. Again, this is just an example of how the syntax for HTTP requests work on express.
