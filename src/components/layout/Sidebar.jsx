import {StickyNote, Trash} from "lucide-react";
import {NavLink, useLocation} from "react-router-dom"

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: StickyNote, label: "My Notes", path: "/" },
    { icon: Trash, label: "Trash", path:"/trash" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-primary text-white flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-20 flex items-center px-6">
      <h1 className="text-2xl font-bold tracking-widest">NOTES</h1>
      </div>

      {/* Menu */}
      <nav className="px-4 py-6 flex-1">
        <ul className="space-y-2">
          {
            menuItems.map((item)=>{
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path==="/");

            return (
              <li key={item.path}>
                <NavLink 
                    to={item.path}
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

      {/* Footer */}
      <div className="p-6 text-xs text-white/60">
        Notes App
      </div>
    </aside>
  );
}

export default Sidebar;