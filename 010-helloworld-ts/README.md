# Hello, world! - typescript version:
We have seen on the previous subject the basics about typescript. Since many topics were covered, I feel like it was a messy reading experience. Here we will have a step by step on how to create a base application, adding all dependencies necessary for a basic hello world typescript api.

## Hello, world! - Starting project:

-   Initialize project ```yarn init -y```;
-   Add express: ```yarn add express```;
-   Create src folder ```mkdir src```;
-   Add express types ```yarn add @types/express -d```;
-   Add typescript to yarn ```yarn add typescript -d```;
-   Initialize typescript ```yarn tsc --init```;
-   Uncomment and change outDir on tsconfig.json:
```json
"outDir": "./dist",
```
-   Add ts-node-dev ```yarn add ts-node-dev -d```;
-   Add script to start server;
```json
"scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules --respawn src/server.ts"
},
```
-   Now we can start the API by running ```yarn dev```;

## Hello, world! - Code:

```typescript
import express from 'express';

const app = express();

app.get("/", (request, response)){
    return response.json({message: "Hello, world!"});
}

app.listen(4006);
```