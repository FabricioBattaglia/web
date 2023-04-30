# Express

Here we will go more in depth in express, even though we have already been using express for a while now.

## Middlewares:
Middlewares are the core focus of Express. It is how express works and why it is so good. Imagine it being a tunnel of functions that requests will pass by. If the request matches a function it will use it, otherwise it simply go to the next one.

## Path filtering:
We can channel paths to go to a different router using the path filtering.
```javascript
//old way:
app.use(adminRoutes);

//new way
app.use('admin', adminRoutes);
```
This way only routes that start with "/admin" will go to admin routes. The method inside the route can omit the "/admin".

