const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    images: [{
      url: String,
      public_id: String,
    }],
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