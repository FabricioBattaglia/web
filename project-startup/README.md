# Starting a project:
Here is a step by step on how to create a skeleton for a node.js application.

First things first, we install node.js on the machine in case it is not installed yet. [Step-by-step here](https://treehouse.github.io/installation-guides/mac/node-mac.html)

Using the terminal on a macOS:
```
brew update
brew install node
```

After it is installed, we can check the version with:
```
node -v
```

After that, we create a folder to hold our project. After that, we are all set to start creating our project.

### Initializing
```
yarn init -y
```
This will already pre-configure our project. The -y flag will already choose some default values for us. If we do not include -y, we will be prompted some options to choose from. After running this, some folders and files should have been added to the root of the project, including a file called package.json.
The package.json file should look something like this:
```json
{
  "name": "project1", 
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```  
Package.json is the file that will contain all dependencies that we install to be used in our project. We can also insert scripts inside this file. 

### Express:
A framework that will add libraries to help solve/fulfill many functions while developing our application. To add express to our project, we run:
```
yarn add express
```
If we check the package.json file, we can see that express has been added as a dependency. Also, a file called node_modules has also been added to our project. Inside this folder, we can find all dependencies that come with express.

### Source code:
Now we can start writing code to make a hello world application. First we create a folder to hold our source code (by default: src). Inside this folder we create a file named "index.json".

Here is what we write inside the file
```javascript
const express = require('express');

const app = express(); //to start this app, we need to define a port to listen...

app.listen(4004); //localhost:4004
```
This application should run already if we run "node src/index.js", but there is not GET route defined...
```javascript
const express = require('express');

const app = express(); //to start this app, we need to define a port to listen...

app.get("/helloworld", (request, response) ==> {  //first parameter is the path, second parameter is the request (what we receive) and response (what we return)
  return response.send("hello, world");  //send allows us to send a message back
}); 
//so to consume this the path would be: localhost:4004/helloworld

app.listen(4004);
```
A more realistic approach would be to use the method json instead of send. This allows us to send a json back as the response to that request. In the end, all we need to change would be:
```javascript
app.get("/helloworld", (request, response) ==> { 
  return response.json({message: "Hello, world"});  
});
```
We have successfully created a node application that returns a json with a message hello world!
