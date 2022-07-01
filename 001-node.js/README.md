# Node.js basics  

## What is Node.js?  
- Open source platform that allows for javascript to be executed on the server side
- Made from: V8 (Chrome engine) + libuv (Multiplatform library) + Multiple other modules  

## What Node was created to solve?
- Created by Ryan Dahl - flickr
- Loading bar would keep making requests to backend to update the percentage
- Asynchronous I/O  

## Node.js characteristics
- Event loop architecture:
  - Call stack
- Single thread
- Non-blocking I/O
- Own modules

### Event loop:  
We have a call stack (a regular stack with functions inside). The event loop will keep listening to the call stack. Whenever a function is called, this function will be sent to a thread. By default, node.js had 4 threads. Event loop is single thread. Once it receives a function, it will distribute to one of the 4 threads previously mentioned. Since it is a stack, it is FILO.

### What are the package managers?
- NPM and Yarn
- Allows us to install external libraries
- Make a library that we have developed available for other developers  
  
## Frameworks:
- Express
- Egg.js
- Nest.js
- Adonis.js

Framework description: [here](https://www.netsolutions.com/insights/what-is-a-framework-in-programming/#:~:text=A%20framework%20in%20programming%20is,inversion%20of%20control%20(IoC).)


