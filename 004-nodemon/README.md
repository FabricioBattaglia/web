# Nodemon

Whenever we are making changes to our node.js application, once we are done, we will have to close our server and start it again to make those changes effective. Thinking of that, and to make our lives easier is Nodemon. This tool will automatically reload our application in order to our changes be effective, without the need to manually do anything.
To add nodemon as a development dependency:
```
yarn add nodemon -d
```
The -d flag sets is as a devDependency. If we check our package.json file we can see nodemon there.

Now we can create a script to execute our application using nodemon:
```json
"scripts": {
  "dev": "nodemon src/index.js"
},
```
Now, whenever we run the code, instead of using the command "node src/index.js" we will use "yarn dev". Now nodemon is running and we do not have to worry about restarting our application whenever we make changes to it!
