# Javascript

This chapter is a refresher/introduction to javascript. We will be using typescript, but since TS is a superset of JS, it is important to know the basics of JS. 

## JS Summary
-   Weakly Typed Language: no explicit type assignment (variables types are mutable)
-   Object Oriented
-   Versatile: runs in browser and directly on a computer/server

## Core Syntax
Variables:
```javascript
var name = "fabricio";
```

Functions:
```javascript
function example(username, userage) {
    return ('Name is ' + username + ', age is ' + userage);
}
```

Print things:
```javascript
console.log(username);
```

## let & const
Instead of using var we use "let". "const" will be used when a variable will not change in value. Let will be used when the value is able to be changed.

## Arrow functions
Allows us to rewrite functions easier:

in older javascript this would work:
```javascript
const example = function(username) {
    return ('Name is ' + username);
}
//here we are creating a function as a const, and we can call the name of the const
```
but now we can use arrow functions, which will remove the need of having the word "function"
```javascript
const example = (username) => {
    return ('Name is ' + username);
}
//this also helps with the keyword "this" which we will see later
```
if we have an arrow function with only one statement, we can write it like this:
```javascript
const example = (username) => 'Name is ' + username;
//so all that this function does is return what is after the arrow
const add = (a,b) => a + b;
//we can also remove the paranthesis when having only one argument
const addOne = a => a + 1;
```

## Classes, objects, properties, methods

Just like Java, javascript is an Object oriented language. That means that we can create classes and objects. Here we will have an example of how to create a class (similar to struct)

```javascript
const person = {
    name: 'Fabricio',
    age: 25,
    greet() { //arrow function does not work here as the this keyword would then refer to the global scope
        console.log('Hi, I am ' + this.name);
    }
};
//here we show how to create a class person that is made of name and age and has a function called greet.
//we can also the the this keyword being used.
//now we can call the function
person.greet();
//and we would have the console log
```

## Arrays and Array methods

Example of array:
```javascript
const hobbies = ['Sports', 'Cooking'];
//how to loop through range of array:
for (let hobby of hobbies) {
    console.log(hobby);
}
```

There are many array methods in javascript. I will not be talking about each of them here. If anything we can always just find documentation on individual array methods.

It is important to note that we can alter an array even if it is declared as a constant. Since all that the constant stores is the memory address to where the array is, by altering the contents of the array we are not altering where in memory it is stored, but what is stored in that address. Therefore since the address doesn't change we do not violate the immutability of const.

## Rest & Spread operators

Spread operator takes the array or object and takes out all the elements or properties and take out of the array or element.
For example: 
```javascript
//Say we use the same array as before: hobbies
//lets make a copy of it:
const copiedArray = [hobbies];
//here what happens is that we are creating an array with the hobbies array inside
//so it is an array of arrays.
//we use the spread operator (...) to remove the elements from inside an array
const copiedArray = [...hobbies];
//now we will have an array with the elements from the array hobbies, instead of the hobbies array inside of it
//This also works with objects, like the person we created before
```

Now lets see what the rest operator is and how to use it:
```javascript
//Say you want to create a method that will get numbers and create an array with them
//we could create a function like this:
const toArray = (arg1, arg2, arg3) => {
    return [arg1, arg2, arg3];
};
//this works but it is unflexible, we can only create an array with 3 elements. To solve this we can use the rest operator
const toArray = (...args) => {
    return args;
};
//this will make so the function will take as many arguments as we want.
```

Basically: If we want to take array elements apart we use the Spread operator. If we want to bundle elements together into an array we use the Rest operator.

## Destructuring

Whenever we want to use data from an array or an object, but we do not need all of the data, we can use destructuring to get only what matters to us. Bellow you can see an example of it.

```javascript
//first we will create a function that will take a field of the person object
const printName = ({ name }) => {
    console.log(name);
};
//so this function will use the field "name" from whatever object we pass to it
//now we make the function call
printName(person); //passing the person we created on a previous example
//another example would be
const { name, age } = person;
console.log(name, age);
//we are getting name and age from person, which forces us to have the consts use the same name as the fields in person
//we can also destructure an array
const hobbies = ['Sports','Cooking'];
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);
//here we can choose any name we want, because by destructuring an array we get things by position
```

## Async Code & Promises

Now we are getting to the point that I was the most excited to get. Asynchronous code and promisses. What is asynchronous code?
Basically any code that does not execute immediatelly. This is important because Javascript (and therefore Node.js) do not block the progress of code because a block of code has not finished working. We will understand that more in this example:
```javascript
setTimeout(() => {
    console.log('Timer is done!');
}, 1000);
console.log('Yellow');
console.log('blue!');
//here we have written a timer that writes out a message when it is done.
//if we execute this code we will see that Yellow and Blue would be printed first
//thats because javascript doesn't wait for the timeout function to finish running before running the rest of the code
//that happens because it detects the 1000ms delay we have set, which is a callback. Since this is a callback function
//Javascript will not await for it to finish running. That is a callback function
```

Promises come into play when we have multiple asynchronous code that depends on one another. We will see a simple example of a promise below, but we will go more into depth when they really get used for projects. In the future we will also go over the "await" keyword.
```javascript
const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!');
        }, 1500);
    });
    return promise;
    //this returns immediately right after the promise is created, but before the code inside runs
    //so we are returning a promise that did not run yet, but once it runs, we will have the data
};

setTimeout(() => {
    console.log('Timer is done!');
    fetchData().then(text => {
        console.log(text);
    });
}, 2000);

console.log('Yellow');
console.log('Blue!');
//here what happens is that the setTimeout function runs, after 2 seconds it will log "Timer is Done"
//After that it will call fetchData. fetch data will run its timer and then return thr resolve "Done"
//setTimeout then logs the "text" field returned, which prints "Done!"
```
This can get more complicated with more nested promises. That is why we will understand better when we get more in depth with real life scenarios.

This is not a complete javascript tutorial. It is more of a refresher to have things in mind for the future of what we will see. 