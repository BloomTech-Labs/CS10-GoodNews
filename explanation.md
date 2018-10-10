# Why MERN?
The main reason for choosing MERN stack was that it provided us with all the tools we needed to build a viable and effective MVP. Also, since this project had a short deadline with only two web engineers, the engineers' better knowledge of the stack played a significant role in the decision-making process.

## MongoDB

MongoDB was selected because it is fast for prototyping. 
We also did the comparison of the strengths and weaknesses of MongoDB vs SQL databases, and came to the conclusion that MongoDB was the best choice for this project. MongoDB was chosen due to its dynamic schema, horizontal scalability, manageability and flexibility. During these early stages of development, it was useful to have the ability to quickly add fields to our application without having to worry about database migrations. SQL database, due to its predefined structure and set schemas which requires significant up-front preparation, seemed like overkill.

## Node.js and Express.js

Node has the advantage of a huge module ecosystem (npm). For most common problems, we can simply download a package instead of writing our own solution. Additionally, the modularity of the Node library lets us use only what we need, so it's more lightweight than a large framework.

The Express framework is also lightweight and flexible. Writing a RESTful API with Express is quick and easy.

## React.js

React was selected for building the front end of the application in part for performance reasons. With React, we simply define the various views of the application, and are not concerned with manually managing changes in the DOM. Instead, React will update the "virtual DOM" automatically when state changes and the actual DOM will be updated more efficiently.

Since React has a large user base, it is well maintained with a large toolkit and thorough documentation.

We also chose React because components can be reused throughout the application, making it easy to maintain and grow.

Additionally, React has cross-platform support. We can reuse the architecture and logic in a React Native application for mobile devices in the future.