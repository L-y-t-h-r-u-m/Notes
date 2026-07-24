import { useState, useEffect, useCallback } from "react";
import { Trash2 } from "lucide-react";
import {
  getTrashNotes,
  restoreNote,
  permanentlyDeleteNote,
} from "../api/notes";
import  NoteCard  from "../components/NoteCard";

export default function Trash() {
  const [trash, setTrash] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrash = useCallback(async() => {
    try{
      setLoading(true);
      const notes = await getTrashNotes();
      setTrash(notes);
    }
    catch(error){
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  },[])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTrash();
  }, [fetchTrash]);

  const handleRestore = async(id) => {
    try{
      await restoreNote(id);
      await fetchTrash();
    }
    catch(error){
      console.error(error);
      alert("Restore Failed!");
    }
  };

  const handleDelete = async(id) => {
    if(!window.confirm("Delete Forever?")) return;
    try{
      await permanentlyDeleteNote(id);
      await fetchTrash();
    }
    catch(error){
      console.error(error);
      alert("Delete Failed!")
    }
  };

  return (
    <div className="p-6 h-screen overflow-y-auto pb-24">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 ml-16 md:ml-0 mt-2">
        <Trash2 /> Trash Bin
      </h1>

      {loading?(<p className = "text-gray-500">Loading..</p>):!trash.length ? (
        <p className="text-gray-500">Trash is empty.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {trash.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              actionType="trash"
              onRestore={handleRestore}
              onPermanentDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
