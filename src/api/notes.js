const API_URL = "http://localhost:5000/api/notes";

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

// create note
export async function createNote(note) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(note),
  });

  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

// get active notes
export async function getNotes() {
  const res = await fetch(API_URL, {
    headers: authHeaders(),
  });
  console.log("Status:", res.status);
  console.log("Token:", localStorage.getItem("token"));
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

// soft delete
export async function deleteNote(id) {
  const res = await fetch(`${API_URL}/${id}/trash`, {
    method: "PATCH",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to move note to trash");
  return res.json();
}

// update note
export async function updateNote(id, updatedData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

// trash notes
export async function getTrashNotes() {
  const res = await fetch(`${API_URL}/trash`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch trash notes");
  return res.json();
}

// restore note
export async function restoreNote(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ trash: false }),
  });

  if (!res.ok) throw new Error("Failed to restore note");
  return res.json();
}

// permanently delete
export async function permanentlyDeleteNote(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to permanently delete note");
  return res.json();
}