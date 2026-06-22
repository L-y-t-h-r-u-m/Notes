const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default: "#ffffff",
    },
    category: {
      type: [String],
      default: [],
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Note", NoteSchema);