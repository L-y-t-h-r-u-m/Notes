const API_URL = "http://localhost:5000/api/notes";

// create note
export async function createNote(note) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

// get active notes
export async function getNotes() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

// soft delete
export async function deleteNote(id) {
  const res = await fetch(`${API_URL}/${id}/trash`, {
    method: "PATCH", 
  });
  
  if (!res.ok) throw new Error("Failed to move note to trash");
  return res.json();
}

// update note
export async function updateNote(id, updatedData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

export async function getTrashNotes() {
  const res = await fetch("http://localhost:5000/api/notes/trash");
  if (!res.ok) throw new Error("Failed to fetch trash notes");
  return res.json();
}

export async function restoreNote(id) {
  const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trash: false }),
  });
  if (!res.ok) throw new Error("Failed to restore note");
  return res.json();
}

export async function permanentlyDeleteNote(id) {
  const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to permanently delete note");
  return res.json();
}