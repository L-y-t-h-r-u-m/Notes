import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import {
  getTrashNotes,
  restoreNote,
  permanentlyDeleteNote,
} from "../../api/notes";

function getTextColor(bg) {
  const color = bg.replace("#", "");

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 150 ? "black" : "white";
}

export default function Trash({ refreshMainNotes }) {
  const [trash, setTrash] = useState([]);

  const fetchTrash = () => getTrashNotes().then(setTrash).catch(console.error);

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleAction = async (id, type) => {
    if (type === "delete" && !window.confirm("Delete forever?")) return;
    try {
      type === "restore"
        ? await restoreNote(id)
        : await permanentlyDeleteNote(id);
      await fetchTrash();
      if (type === "restore") await refreshMainNotes();
    } catch (error) {
      alert("Action failed");
    }
  };

  return (
    <div className="p-6 h-screen overflow-y-auto pb-24">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Trash2 /> Trash Bin
      </h1>

      {!trash.length ? (
        <p className="text-gray-500">Trash is empty.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {trash.map((note) => {
            // color based on note's background
            const textColor = getTextColor(note.bgColor);

            return (
              <div
                key={note._id}
                style={{ backgroundColor: note.bgColor, color: textColor }}
                className="w-64 p-4 rounded-xl shadow opacity-80 flex flex-col transition-all"
              >
                <h2 className="font-bold text-lg shrink-0">
                  {note.title || "Untitled"}
                </h2>
                <div
                  className="flex-grow overflow-hidden text-sm my-2"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />

                <div
                  className="mt-auto flex justify-between pt-3 border-t"
                  style={{
                    borderColor:
                      textColor === "white"
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(0,0,0,0.1)",
                  }}
                >
                  <button
                    onClick={() => handleAction(note._id, "restore")}
                    className="font-bold text-xs hover:opacity-70 transition-opacity"
                    style={{ color: textColor }}
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => handleAction(note._id, "delete")}
                    className="font-bold text-xs hover:opacity-70 transition-opacity"
                    style={{ color: textColor }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
