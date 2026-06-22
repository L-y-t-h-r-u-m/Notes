import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./components/layout/Dashboard";
import Trash from "./components/layout/Trash";
import {useState,useEffect} from "react";
import{BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  const [notes, setNotes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  async function getNotes() {
    try {
      const res = await fetch("http://localhost:5000/api/notes");
      const data = await res.json();
      if (Array.isArray(data)) {
        setNotes(data);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  }
  
 
  useEffect(() => {
    getNotes();
  }, []);

const uniqueCategories = ["All", ...new Set(notes.flatMap(note => note.category || []))];

const filteredNotes = notes.filter(note=>{
  if(activeCategory==="All") return true;
  return note.category && note.category.includes(activeCategory);
})
  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Sidebar
        categories={uniqueCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="flex-grow flex flex-col overflow-hidden">

        <Routes>
          <Route 
            path="/" 
            element={<Dashboard notes={filteredNotes} refreshNotes={getNotes} />} 
          />
          
          <Route 
            path="/trash" 
            element={<Trash refreshMainNotes={getNotes} />} 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;