# Why MERN?
Since this project had a short deadline with only two web engineers, we didn't want to optimize too early. At this stage, we were more concerned with getting an MVP quickly than scalability, with the plan to optimize later on. With this in mind, we chose the MERN stack.

## MongoDB

MongoDB was selected because it is fast for prototyping, yet can easily be migrated to a SQL database in the future. During these early stages of development, it was useful to have the ability to quickly add fields to our application without having to worry about database migrations. 

## Node.js and Express.js

Node has the advantage of a huge module ecosystem (npm). For most common problems, we can simply download a package instead of writing our own solution. Additionally, the modularity of the Node library lets us use only what we need, so it's more lightweight than a large framework.

The Express framework is also lightweight and flexible. Writing a RESTful API with Express is quick and easy.

## React.js

React was selected for building the front end of the application in part for performance reasons. With React, we simply define the various views of the application, and are not concerned with manually managing changes in the DOM. Instead, React will update the "virtual DOM" automatically when state changes and the actual DOM will be updated more efficiently.

Since React has a large user base, it is well maintained with a large toolkit and thorough documentation.

We also chose React because components can be reused throughout the application, making it easy to maintain and grow.

Additionally, React has cross-platform support. We can reuse the architecture and logic in a React Native application for mobile devices in the future.