import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Trash from "./pages/Trash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import{ Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function DashboardLayout(){
  return(
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Sidebar/>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet/>
      </div>
    </div>
  )
}

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
    <Route element = {<ProtectedRoute/>}>
      <Route path = "/dashboard/" element = {<DashboardLayout/>}>
          <Route 
            index element={<Dashboard />} 
          />
          
          <Route 
            path="trash" 
            element={<Trash />} 
          />
          </Route>
    </Route>
    </Routes>
  );
}

export default App;