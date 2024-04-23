const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = process.env.PORT | 5000;
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Serve the React app
app.use(express.static(path.join(__dirname, "build")));

// middleware
app.use(cors());
app.use(express.json());

const { initRootRouter } = require("./src/routers/rootRouter");

async function run() {
  try {
    initRootRouter(app);
  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("/api", async (req, res) => {
  res.send("Server Running");
});

// Serve the React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log("Server running on port", port);
});

