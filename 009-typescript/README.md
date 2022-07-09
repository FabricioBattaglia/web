# Typescript:
Now we will learn about typescript. We will see the why it was created and the differences to javascript. We will see why it is important and why it is used.

### What is Typescript?
-   Open source language created by microsoft;
-   It is a superset of javascript;
-   Optional Static typing: (variables have a static/unmutable data type);
-   It is transpiled to javascript;

What does static typing means? We will use an example to explain this. Imagine we have a varible called name and we set its value to "john". On javascript we can simply say that name = 10 and that's ok. With typescript we would define a variable with a data type. So say we define name as a string. That makes impossible to set name to anything that is not a string. And that is what static typing is.
Here we can see an example of each language:
#### Javascript:
```javascript
const user = {
    name: "john",
    age: 24,
    ssn: 1234567890
}

//here we can see that we can change ssn to be a string now:
user.ssn = "1231231230";
```
#### Typescript:
```typescript
class User {
    name: string;
    age: int;
    ssn: int;
}
const user: User = {
    name: "John",
    age: 24,
    ssn: 1234567890
}
//Here we cannot change any field to a different data type
```

### So what does it solve?
The existance of static typing makes it so we can have a better control over data types. We can enforce easier what data type is expected from a function, class, etc.

### Important facts:
-   Typescript and Javascript can both be used in a single project;
-   You do not have to type all variables when developing in typescript - it is optional;
-   Typescript is NOT the same as javascript. Although both are really similar, they have differences;
-   Typescript 

## Starting a project in Typescript:
Just like we saw for javascript, now we will have a step by step on how to start a project using typescript.
-   First, just like we did with javascript, we run ```yarn init -y```;
-   Now that we have our package.json created, we add express: ```yarn add express```;
-   Just like before, we create a folder to hold our source code: ```mkdir src```;
-   Now we will see the first difference - create a file named server.ts;
-   We can now discuss what will be done inside the server file, **BUT WE WILL ADD MORE STUFF TO THIS LATER ON**;

**NOTE: In order to make the development process easier, we need to understand one thing: We will not have autocomplete on our IDE if we do not add the dependencies for it. For example, you will not have any autocomplete suggestion while developing using express until you run ```yarn add @types/express -d```. This adds the dependecy that will suggest autocompletion for express functions. It is important to note that the IDE will let us know by having "..." before the name of the dependency on the import inside the server.ts file. So for each dependency we have to check what we need to allow for autocomplete suggestions to be available for us. This is essential as it dramatically improves the development process.**

### Inside server.ts: Hello, world!
```typescript
import express from 'express';

const app = express();

app.get("/", (request, response)){
    return response.json({message: "Hello, world!"});
}

app.listen(4006);
```

### Running the code:
If we try to run the code with ```node src/server.ts``` we will see that it does not work. This happens because, by default, node does not recognize the import statement. So we need to transpile this file to something that node understands. Therefore we will transpile this code to javascript. How? ```yarn add typescript -d```. After adding typescript, we need to initialize it: ```yarn tsc --init```. Now we can proceed to transpiling it to javascript: ```yarn tsc```. This will create a file named server.js, which is the transpilation of our code. It is important to note that with the current state of things, whenever we run the tsc command, we will create a new javascript file. This is bad as it will create a js file per ts file, cluttering our src folder. To change this we can go inside the file tsconfig.json and find "outDir". We uncomment it and add the file where the js code should be directed to. We change it to:
```json
"outDir": "./dist",
```
This makes so when we run ```yarn tsc``` the transpiled javascript code will be sent to a new folder called dist. Now we can also tackle the problem that is: we do not have nodemon, so every time we make a change, we have to run ```yarn tsc``` and then ```node src/server.ts```. To avoid this, we will be configuring ts-node-dev. To add this library we have to run ```yarn add ts-node-dev -d```. Now we go to package.json and create a script:
```json
"scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules --respawn src/server.ts"
},
```
Now we run the code by running ```yarn dev```.
**NOTE: transpile only: for dev environment, it will not display some errors. ignore watch node modules: it will make so it ignores the changes on node modules folder. respawn: make our application reload whenever we have a change in the code a**

