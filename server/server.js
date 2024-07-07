const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');


// Import Apollo Server and related dependencies
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


// Apollo Server setup
async function startApolloServer() {

  // Create a new instance of Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,

    // Apply the authMiddleware to the context of Apollo Server
    context: ({ req }) => authMiddleware({ req }),
  });

  // Start the Apollo Server
  await server.start();

  // Apply middleware to Express app
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        return authMiddleware({ req });
      },
    })
  );


app.use(routes);

 // Connect to the database and start the Express server
 db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});
}

// Start the Apollo Server
startApolloServer();

//========================================================================================================================
// Original Code [RESTful API]
//========================================================================================================================
// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
