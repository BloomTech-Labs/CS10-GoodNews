# Why MERN?
The main reason for choosing MERN stack was that it provided us with all the tools we needed to build a viable and effective MVP. Also, since this project had a short deadline with only two web engineers, the engineers' better knowledge of the stack played a significant role in the decision-making process.

## Back-End Dependencies `(Production)`
### MongoDB
[MongoDB](https://www.mongodb.com/) was selected because it is fast for prototyping. 
We also did the comparison of the strengths and weaknesses of MongoDB vs SQL databases, and came to the conclusion that MongoDB was the best choice for this project. MongoDB was chosen due to its dynamic schema, horizontal scalability, manageability and flexibility. During these early stages of development, it was useful to have the ability to quickly add fields to our application without having to worry about database migrations. SQL database, due to its predefined structure and set schemas which requires significant up-front preparation, seemed like overkill.

### Node.js
[Node](https://nodejs.org/en/) has the advantage of a huge module ecosystem (npm). For most common problems, we can simply download a package instead of writing our own solution. Additionally, the modularity of the Node library lets us use only what we need, so it's more lightweight than a large framework.

### Express.js
[The Express framework](http://expressjs.com/) is lightweight and flexible. Writing a RESTful API with Express is quick and easy.

### Bcrypt.js
[Bcrypt](https://www.npmjs.com/package/bcryptjs) is an adaptive hash function that incorporates a salt to protect against rainbow table attacks and remains resistant to brute-force search attacks even with increasing computation power.

### Cors
[Cors](https://github.com/expressjs/cors) is used to enable cross-origin resource sharing functionality in Express-based apps.

### Mongoose
[Mongoose](https://mongoosejs.com/) is a straight-forward, schema-based solution for modeling application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

### Helmet
[Helmet](https://helmetjs.github.io/) secures Express apps by setting various HTTP headers.

### JSON Web Token
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) npm library is an implementation of [JSON Web Tokens](https://tools.ietf.org/html/rfc7519).

## Back-End Dependencies `(Development)`
### Nodemon
Restarts development server automaticaly making the development process more efficient.

### Jest
[Jest](https://jestjs.io/) provided ready-to-use testing tools for testing Javascript code both for front-end and back-end. 

### Supertest
Using Jest with [Supertest](https://www.npmjs.com/package/supertest makes integration testing more efficient.

## Front-End Dependencies `(Production)`
### React.js

React was selected for building the front end of the application in part for performance reasons. With React, we simply define the various views of the application, and are not concerned with manually managing changes in the DOM. Instead, React will update the "virtual DOM" automatically when state changes and the actual DOM will be updated more efficiently.

Since React has a large user base, it is well maintained with a large toolkit and thorough documentation.

We also chose React because components can be reused throughout the application, making it easy to maintain and grow.

Additionally, React has cross-platform support. We can reuse the architecture and logic in a React Native application for mobile devices in the future.

### Axios
[Axios](https://www.npmjs.com/package/axios) is a promise based HTTP client for the browser and node.js.

### Semantic UI React
[Semantic UI React](https://www.npmjs.com/package/semantic-ui-react) is a React integration for Semantic UI.

### Dotenv
[Dotenv](https://www.npmjs.com/package/dotenv) is a zero-dependency module that loads environment variables from a .env file into process.env.

## Front-End Dependencies `(Development)`
### Enzyme
[Enzyme](https://github.com/airbnb/enzyme) is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.
