const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Serve index.html for all other routes to enable client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Apollo Server setup
const startApolloServer = async () => {
  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => authMiddleware({ req }),
    introspection: true,
    debug: true, // Enable detailed error messages
    playground: true,
  });

  // Apply middleware to Express app for Apollo Server
  await server.start();
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => authMiddleware({ req }),
  }));

  // Start the server after setting up Apollo Server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Start Apollo Server and Express server
startApolloServer();







// const express = require('express');
// const path = require('path');
// // Import the ApolloServer class
// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const { authMiddleware } = require('./utils/auth');

// // Import the two parts of a GraphQL schema
// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');

// const PORT = process.env.PORT || 3001;
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const app = express();

// // Create a new instance of an Apollo server with the GraphQL schema
// const startApolloServer = async () => {
//   await server.start();
  
//   app.use(express.urlencoded({ extended: false }));
//   app.use(express.json());
  
//   app.use('/graphql', expressMiddleware(server, {
//     context: authMiddleware
//   }));

//   if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')));

//     app.get('*', (req, res) => {
//       res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//     });
//   }

//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//     });
//   });
// };

// // Call the async function to start the server
// startApolloServer();





//FIXME:
//================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================


// const express = require('express');
// const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');


// // Import Apollo Server and related dependencies
// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');


// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/dist')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//   });
// }





// // Apollo Server setup
// async function startApolloServer() {

//   // Create a new instance of Apollo Server
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,

//     // Apply the authMiddleware to the context of Apollo Server
//     context: ({ req }) => authMiddleware({ req }),
//   });

//   // Start the Apollo Server
//   await server.start();

//   // Apply middleware to Express app
//   app.use(
//     '/graphql',
//     expressMiddleware(server, {
//       context: async ({ req }) => {
//         return authMiddleware({ req });
//       },
//     })
//   );


// app.use(routes);

//  // Connect to the database and start the Express server
//  db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`🌍 Now listening on localhost:${PORT}`);
//     console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//   });
// });
// }

// // Start the Apollo Server
// startApolloServer();

// //========================================================================================================================
// // Original Code [RESTful API]
// //========================================================================================================================
// // db.once('open', () => {
// //   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// // });
