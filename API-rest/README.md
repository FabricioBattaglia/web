# Rest API

### What is an API?
An API is basically the middleman between applications, dealing with interactions. API stands for Application Programming Interface. It specifies how an application can be used by developers through documentation. A great example of API and its' documentation is [the github API](https://docs.github.com/en/rest/repos). Therefore, it is really important to document well the API endpoints, routes, and returns when creating an API.

### What is REST?
It stands for Representation State Transfer. REST is a set of rules, or better said, an Architecture of an API.
Rest has 6 basic rules:
- Client-Server: responsibilities are separated. Client and server "don't worry" about the other one;
- Stateless: Client can make as many requests to the server, but server will not save any states from these requests. So each request needs to send all necessary information for the server to fulfill it;
- Cache: Allow that in the future our API will support Cache
- Uniform Interface
  - Identify resources;
  - Resource representation (JSON, XML, ETC);
  - Self explanatory messages (Ex: meaningful error messages);
  - HATEOAS: Hypertext As The Engine Of Application State: Be able to return links inside our request;
- Layering: There should be layers between client and server;
- On-demand code: Allows for client functionalities to be extended by scripts;
