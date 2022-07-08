# Project 2.1: Adding middlewares to the To-do API

In this project we will add middlewares to the api we developed for last project. The middlewares will add checks and functionalities to the existing routes. There will be minor change to the previously established API. Now we will have a free app and a "paid" (not really) version. There is where the middlewares come into action. While the paid plan will allow for the user to have unlimited to-dos, the free plan should let a user to have only 10 at a time.

First we have to discuss what will change on our current code:
-   User now will have another field: pro: false;
-   We need to add the route: GET/users/:id - return a json with the user;
-   We also need to add the route: PATCH/users/:id/pro

There will be four middleware functions:
-   checkExistsUserAccount; (Done on last assignment)
-   checkTodoAvailability: checks if user has availability for a new to-do;
-   checkTodoExists;
-   findUserById;


These middlewares should fulfill the following specifications:
-   Only allow a new to-do to be created by a free user if this user has less than 10 active to-dos;
-   Pro plan users should be able to create unlimited to-dos;