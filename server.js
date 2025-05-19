const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
const PORT = 5000;
// const FILE_PATH = "/server/data.json";
const FILE_PATH = path.join(__dirname, "data.json");

app.use(cors());
app.use(bodyParser.json());

// Helper: Read data from file
function readData() {
  const jsonData = fs.readFileSync(FILE_PATH);
  return JSON.parse(jsonData);
}

// Helper: Write data to file
function writeData(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// GET all users
app.get("/users", (req, res) => {
  const data = readData();
  res.json(data);
});

// CREATE user
app.post("/users", (req, res) => {
  const data = readData();
  const newUser = { id: Date.now(), ...req.body };
  data.push(newUser);
  writeData(data);
  res.status(201).json(newUser);
});

// UPDATE user
app.put("/users/:id", (req, res) => {
  const data = readData();
  const userId = parseInt(req.params.id);
  const index = data.findIndex((u) => u.id === userId);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  data[index] = { ...data[index], ...req.body };
  writeData(data);
  res.json(data[index]);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const data = readData();
  const userId = parseInt(req.params.id);
  const updatedData = data.filter((u) => u.id !== userId);
  writeData(updatedData);
  res.json({ message: "User deleted" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
