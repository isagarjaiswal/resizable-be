const express = require("express"); // Importing Express framework
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const cors = require("cors"); // Middleware for enabling CORS
require("dotenv").config(); // Loading environment variables from .env file
require("./config/db"); // Connecting to database
const Box = require("./schema/boxSchema"); // Importing Box schema
const app = express(); // Creating Express application instance
const PORT = process.env.PORT || 3000; // Setting port number

// Middleware setup
app.use(bodyParser.json()); // Using body-parser middleware for parsing JSON bodies
app.use(cors()); // Using cors middleware for enabling cross-origin resource sharing

let count = 0; // Initializing count variable

// Middleware to increment count on POST and PUT requests
app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    count += 1; // Incrementing count on POST and PUT requests
  }
  next();
});

// Route to handle POST request for adding data
app.post("/api/add", async (req, res) => {
  try {
    const { content } = req.body; // Extracting content from request body
    let box = new Box({ content }); // Creating a new Box instance with content
    await box.save(); // Saving the box data to the database

    res.send({ data: box }); // Sending response with saved data
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error"); // Handling internal server error
  }
});

// Route to handle PUT request for updating data
app.put("/api/update", async (req, res) => {
  try {
    const { text: content, _id } = req.body;
    console.log({ content, _id });
    // Extracting content and _id from request body
    if (!_id) {
      return res.status(400).send("Invalid _id provided"); // Handling invalid _id
    }
    if (!content) {
      return res.status(400).send("Content field is required"); // Handling missing content
    }
    let updatedScreen = await Box.findOneAndUpdate(
      { _id },
      { content },
      { new: true }
    ); // Updating screen data with new content

    if (!updatedScreen) {
      return res.status(404).send("Screen not found"); // Handling screen not found
    }

    res.send("Data updated successfully"); // Sending success response
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error"); // Handling internal server error
  }
});

// Route to handle GET request for getting count
app.get("/api/count", async (req, res) => {
  try {
    res.send({ count }); // Sending response with count
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error"); // Handling internal server error
  }
});

// Route to handle GET request for getting all entries
app.get("/api/allEntries", async (req, res) => {
  try {
    const allData = await Box.find({}); // Fetching all data from the database
    res.send({ data: allData }); // Sending response with all data
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error"); // Handling internal server error
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`); // Logging server running message
});
