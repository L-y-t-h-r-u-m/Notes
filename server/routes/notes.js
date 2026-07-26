const router = require("express").Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth");
const cloudinary = require("../config/cloudinary");

// 1. create note
router.post("/", auth, async (req, res) => {
  try {
    const { title, content, bgColor, category, images } = req.body;
    
    const note = await Note.create({ title, content, bgColor, category, images, user: req.user.id });
    res.status(201).json(note); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. get all active notes
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ trash: false, user: req.user.id, }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. get trash notes
router.get("/trash",auth, async (req, res) => {
  try { 
    const notes = await Note.find({ trash: true, user: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. Update note
router.put("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
    {  
      _id: req.params.id,
      user: req.user.id, 
    },
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

router.patch("/:id/trash", auth, async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
    {
      _id: req.params.id,
      user: req.user.id,
    },
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
router.delete("/:id", auth, async (req, res) => {
  try { 
    const note = await Note.findOne(
      {  
        _id: req.params.id,
        user: req.user.id, 
      }
    );
    
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.images && note.images.length > 0) {
      for (const image of note.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }

    await note.deleteOne();

    res.json({ message: "Deleted forever" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;