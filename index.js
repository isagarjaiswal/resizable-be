// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db");
const Box = require("./schema/boxSchema");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

let count = 0;

app.post("/api/add", async (req, res) => {
  try {
    const { content } = req.body;
    let box = new Box({ content });
    await box.save();
    res.send({ data: box });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/update", async (req, res) => {
  try {
    count++;
    const { content } = req.body;
    let updatedScreen = await Screen.findOneAndUpdate(
      {},
      {
        $set: {
          box1: content,
          box2: content,
          box3: content,
        },
      },
      { new: true }
    );
    if (!updatedScreen) {
      return res.status(404).send("Screen not found");
    }
    res.send("Data updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/count", async (req, res) => {
  try {
    res.json(count);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/allEntries", async (req, res) => {
  try {
    const allData = await Box.find({});

    res.send({ data: allData });
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
