const router = require("express").Router();
const Note = require("../models/Note");

// 1. create note
router.post("/", async (req, res) => {
  try {
    const { title, content, image, bgColor, category } = req.body;
    
    const note = await Note.create({ title, content, image, bgColor, category });
    res.status(201).json(note); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. get all active notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ trash: false }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. get trash notes
router.get("/trash", async (req, res) => {
  try { 
    const notes = await Note.find({ trash: true }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. Update note
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body, 
      { returnDocument: 'after' } 
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 5. Move to trash

router.patch("/:id/trash", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { trash: true },
      { returnDocument: 'after' }
    );
    
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Moved to trash", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 6. Delete
router.delete("/:id", async (req, res) => {
  try { 
    const note = await Note.findByIdAndDelete(req.params.id);
    
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Deleted forever" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;