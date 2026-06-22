import { useState } from "react";
import NoteModal from "./NoteModal";
import NoteCard from "./NoteCard";
import { createNote, deleteNote as removeNote, updateNote } from "../../api/notes";

function Dashboard({ notes = [], refreshNotes }) {
  const [open, setOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // save note
  async function saveNote(note) {
    try {
      
      if (note._id) {
        await updateNote(note._id, note);
      } else {
        await createNote(note);
      }
      await refreshNotes();
      setOpen(false);
      setEditingNote(null);
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save note");
    }
  }

  // delete note
  async function handleDelete(id) {
    try {
      await removeNote(id);
      await refreshNotes();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  }

  return (
    <div className="p-6 h-screen overflow-y-auto pb-24">
      <button
        onClick={() => {
          setOpen(true);
          setEditingNote(null);
        }}
        className="mr-auto w-28 h-12 rounded-lg shadow-lg bg-primary text-white font-semibold transition-colors"
      >
        New Note
      </button>

      {open && (
        <NoteModal
          initialNote={editingNote}
          close={() => {
            setOpen(false);
            setEditingNote(null);
          }}
          onSave={saveNote}
        />
      )}

      <div className="flex flex-wrap gap-5 mt-8">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onDelete={handleDelete}
            onEdit={(noteToEdit) => {
              setEditingNote(noteToEdit);
              setOpen(true);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;