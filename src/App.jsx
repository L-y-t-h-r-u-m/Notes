import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Trash from "./pages/Trash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import{ Routes, Route} from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/" element={
        <div className="min-h-screen bg-black flex justify-center items-center">
      <Login/>
    </div>
      }/>
      <Route path="/login" element={
        <div className="min-h-screen bg-black flex justify-center items-center">
      <Login/>
    </div>
      }/>
      <Route path="/register" element={<div className="min-h-screen bg-black flex justify-center items-center">
      <Register/>
    </div>}/>

      {/*NOTES APP */}
      <Route path = "/dashboard/*" element = {
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Sidebar/>

      <div className="flex-grow flex flex-col overflow-hidden">

        <Routes>
          <Route 
            index element={<Dashboard />} 
          />
          
          <Route 
            path="trash" 
            element={<Trash />} 
          />
        </Routes>
      </div>
    </div>
    } />
    </Routes>
  );
}

export default App;