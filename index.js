const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const typeDefs = require("./src/graphql/types");
const resolvers = require("./src/graphql/queries");
require("dotenv").config();
const { initRootRouter } = require("./src/routers/rootRouter");
const { ApolloServer } = require("apollo-server-express");
const { graphqlExpress } = require("apollo-server-express");

// Serve the React app
app.use(express.static(path.join(__dirname, "build")));

// Middleware
app.use(cors());
app.use(express.json());

// Initialize root router
try {
  initRootRouter(app);
} catch (err) {
  console.log(err.message);
}

// Create an instance of Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/api/graphql" });
}
startApolloServer()
// Route for testing API
app.get("/api", async (req, res) => {
  res.send("Server Running");
});

// Serve the React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log("Server running on port", port);
});
