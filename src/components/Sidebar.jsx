import {StickyNote, Trash, Menu, X} from "lucide-react";
import {NavLink, useNavigate} from "react-router-dom"
import {useState} from "react";
import {logoutUser} from "../api/auth";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const menuItems = [
    { icon: StickyNote, label: "My Notes", path: "/dashboard" },
    { icon: Trash, label: "Trash", path:"/dashboard/trash" },
  ];

  return (
    <>
    {!isOpen && <button
        onClick={() => setIsOpen(true)}
        className="fixed top-7 left-4 z-50 p-2 rounded-lg bg-primary text-white md:hidden"
    >
        <Menu size={24}/>
      </button>
    }
    <aside className={`w-64 h-screen bg-primary text-white flex flex-col shrink-0
        fixed top-0 left-0 z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0":"-translate-x-full"}
        md:translate-x-0 md:static md:flex
    `}>
      {/* Logo */}
      <div className="h-20 items-center px-6 flex justify-between">
      <h1 className="text-2xl font-bold tracking-widest">NOTES</h1>
      <button 
        onClick={()=>setIsOpen(false)}
        className = "md:hidden"
      >
        <X size={24}/>
      </button>
      </div>

      {/* Menu */}
      <nav className="px-4 py-6 flex-1">
        <ul className="space-y-2">
          {
            menuItems.map((item)=>{
              const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink 
                    to={item.path}
                    end={item.path==="/dashboard"}
                    onClick={()=> setIsOpen(false)}
                    className={({isActive}) =>
                       `flex items-center gap-3 px-4 py-3 rounded-xl transition
                            ${
                                isActive ? "bg-white text-primary" : "hover:bg-white/20"
                            }
                        `  
                    }
                >
                <Icon size={18} />
                <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / Logout */}
      <div className="p-6 text-xs text-white/60 flex justify-between items-center">
        <span>Notes App</span>
        <button 
          onClick={handleLogout}
          className="px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
    </>
  );
}

export default Sidebar;