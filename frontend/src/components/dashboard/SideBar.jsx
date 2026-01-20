import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  ArrowDownUp,
  PieChart,
  Settings,
  LogOut,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../../lib/store/AuthStore";

const SideBar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
     ${
       isActive
         ? "bg-primary/20 text-primary"
         : "text-muted-foreground hover:bg-blue-50 dark:hover:bg-blue-900/50"
     }`;

  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const handleLogOut = () => {
    if (confirm("are you sure to logout")) {
      clearAuth();
      queryClient.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
    <aside className='w-56 min-h-screen hidden border-r bg-linear-to-b from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 sm:flex flex-col'>
      {/* Logo */}
      <div className='mb-8 px-2'>
        <h1 className='text-xl font-bold text-primary/70'>Finance Tracker</h1>
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-2'>
        <NavLink to='/dashboard' className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to='/transactions' className={linkClass}>
          <ArrowDownUp size={18} />
          Transactions
        </NavLink>

        <NavLink to='/analytics' className={linkClass}>
          <PieChart size={18} />
          Analytics
        </NavLink>

        <NavLink to='/settings' className={linkClass}>
          <Settings size={18} />
          Settings
        </NavLink>

        <button
          onClick={handleLogOut}
          className='flex items-center gap-3 px-4 mt-8 py-2 w-full text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg'
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default SideBar;
