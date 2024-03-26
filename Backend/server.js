import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Defining Schema
const passopSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String,
});

// Mongoose Model
const passopModel = new mongoose.model("passopdetails", passopSchema);

// GET route to fetch data
app.get("/", async (req, res) => {
  try {
    const data = await passopModel.find();
    res.json(data);
  } catch (error) {
    console.error("Error while fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST route to add data
app.post("/add", async (req, res) => {
  try {
    const { site, username, password } = req.body;
    const newData = new passopModel({ site, username, password });
    await newData.save();
    res.status(201).json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error while adding data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT route to edit data
app.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { site, username, password } = req.body;
    await passopModel.findByIdAndUpdate(id, { site, username, password });
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error while editing data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE route to delete data
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await passopModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error while deleting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
