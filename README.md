### Introduction
This project has the intention of create a REST API using `node.js / express.js / mongoDB`

**REST** is an acronym for Representation State Transfer and is an industry standard (till Graphql conquers the world) for defining how an API and its endpoint (routes) should communicate with the server code of your web application. A REST API consumes HTTP methods such GET, POST, etc. with endpoints that are nothing but URLs that you can use to fetch some data or update/create new data in the database. 

A typical Express application follows MVC (model-view-controller) model to define a directory structure and that is what we are going to do.

```
my-server
├── index.js
├── .env
└── src
    ├── Controllers
					└── controllers grouped by feature/routes in folders. 
		├── Models
					└── models used in the app - will have a representation on the db. 
		├── db   ── will abstract and handle all conections with db   
    └── ...
```
### Dependencies

```
   - eslint: Linters are tools that perform static analysis on software in order to recognise and report adherence/non-adherance to some set of coding best practice.
   - express: Library to create server and attend HTTP request.
   - jwt / jsonwebtoken / express-jwt: the intention is to create a login app to list a bunch of things for logged in users. the authentication will be handled with jwt.
```

**eslint:** To explain a little further, `eslint src/js` is a command that we could enter in our terminal/command line to run eslint on JavaScript files contained in the `src/js` directory inside our app directory. Including the above inside our app's package.json file provides a shortcut for this command. => inside scripts: `"lint": "eslint src"`

### Configs

We are going to use `nodemon` to run the server because it watches the file system for changes and automatically restarts the process of server-startup `node index.js`.

In order to run the project with `nodemon` added as a dev dependency (using this command `npm install nodemon --save-dev`), and not installed globally, we need to run the app using an alias or a command that will look the the current npm bin folder of the project. From that place, we will have access of `nodemon` command directly. 

**How we do that? we can create this alias in the `.bashsc` file** 
```
  alias npm-exec='PATH=$(npm bin):$PATH'
```
**Then inside `package.json` we will have this start command:**
```
 "scripts": {
    "start": "npm-exec nodemon index.js"
  }
```

### Authentication

We are going to use JWT to create an authentication token. 
Inside `middlewares/jwt.js` we defined a few public routes that won't need authentication. Normally the `login` page is one of those public.

1. in order to log-in we need to do a `POST` request with an `application/json` content type to the `http://localhost:3301/api/users/authenticate` endpoint. The submitted data should look like:

  ```json
  {
      username: "myusername",
      password: "mypassword"
  }
  ```
if the user exists and the password is correct, we will receive back the `JWT Token`. Be aware that all future calls to api that need authentication will use that tokem.

2. If we want to access to api endpoints that are private, we need to send the `token` inside the `headers` of the HTTP request. For example, doing a GET call to `http://localhost:3301/api/users/` we will ask for all users. But this request need to have inside the `header`.
```json
  {
      authorization: "Bearer myJWT-token",
      ... other header parameters 
  }
  ```