import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";
import { createNote, deleteNote as removeNote, updateNote, getNotes } from "../api/notes";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      if (Array.isArray(data)) {
        setNotes(data);
      }
    } catch (error) {
      if (error.message.includes("401")) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      console.error("Failed to fetch notes:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // save note
  async function saveNote(note) {
    try {
      
      if (note._id) {
        await updateNote(note._id, note);
      } else {
        await createNote(note);
      }
      await fetchNotes();
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
      await fetchNotes();
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
        className="ml-16 md:ml-0 w-28 h-12 rounded-lg shadow-lg bg-primary text-white font-semibold transition-colors"
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

      <div className="flex flex-wrap gap-5 justify-center md:justify-start mt-8">
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