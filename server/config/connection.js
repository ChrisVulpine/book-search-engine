const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ChrisVulpine:99ctQeKKE0pS3ccI@cluster0.6rugocc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


module.exports = mongoose.connection;

// mongoose.connect((process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks'), {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   }).then(() => {
//     console.log('MongoDB Connected');
//   }).catch(err => {
//     console.error('MongoDB Connection Error:', err);
//   });

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://ChrisVulpine:11@Rocklee@cluster0.6rugocc.mongodb.net/?appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
