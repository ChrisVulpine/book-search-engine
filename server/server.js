const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
  introspection: true,
  debug: true,
  playground: false,
});


const app = express();


// Apollo Server setup
const startApolloServer = async () => {

  // Apply middleware to Express app for Apollo Server
  await server.start();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cors({
    origin: 'https://book-search-engine-v6z4.onrender.com',
    credentials: true,
  }));


  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => authMiddleware({ req }),
  }));


// Serve static files in production
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Serve index.html for all other routes to enable client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/src/pages/SearchBooks.jsx'));
  });
}

  // Start the server after setting up Apollo Server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      //For Local Work >> console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      console.log(`Use GraphQL at https://book-search-engine-v6z4.onrender.com/graphql`);

    });
  });
};

// Start Apollo Server and Express server
startApolloServer();