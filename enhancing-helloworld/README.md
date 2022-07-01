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

# Dealing with parameters:
Now that we have a basic understanding of HTTP requests, we can break down the parameters it receives:

## Route parameters:
These are the parameters sent in the route. From our previous example, :id is a route parameter. But what are route parameters mainly used for?
- Search resource
- Identify resource
- Edit resource
- Delete resource

We can access these parameters like this:
```javascript
app.put("/courses/:id", (request, response) ==> {
  const params = request.params;  //this is how we can access it...
  return response.json(["names"]);
});

//We can also get it by: const { id } = request.params;
```

## Query parameters:
Mainly used for pagination and filtering. Ex: ?page=1&per_page=2
We can also access the value sent through a query parameter in our application:
```javascript
const query = request.query; //inside get request, as an example...
```
Query parameters are understood as optional. The API will still run if it does not receive them, while route parameters are essential.

## Body parameters:
This is how we can pass objects to our API. Basically, this is how the bulk of the data is sent to the server side using a HTTP request.
This is how we can access the values:
```javascript
//first we need to declare this line
app.use(express.json()); //This is a midware (put under the line: const app = express();

//now we can demonstrate how to access the json inside the body of a post request
const body = request.body; //inside post request, as an example...
```
Since express works with other types and not only json makes the first line essential for us to access information sent as a json.
