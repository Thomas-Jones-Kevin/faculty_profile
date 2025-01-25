const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON in requests

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/facultyProfile", { family: 4 })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Faculty Schema
const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const Faculty = mongoose.model("Faculty", facultySchema);

// Default route (Optional)
app.get("/", (req, res) => {
  res.send("Welcome to the Faculty Profile Management API!");
});

// Routes

// 1. Create a Faculty Profile
app.post("/api/faculty", async (req, res) => {
  const { name, department, designation, email, phone } = req.body;
  
  try {
    const faculty = new Faculty({
      name,
      department,
      designation,
      email,
      phone,
    });

    await faculty.save();
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2. Get All Faculty Profiles
app.get("/api/faculty", async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. Update a Faculty Profile by ID
app.put("/api/faculty/:id", async (req, res) => {
  const { name, department, designation, email, phone } = req.body;
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { name, department, designation, email, phone },
      { new: true }
    );
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. Delete a Faculty Profile by ID
app.delete("/api/faculty/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 