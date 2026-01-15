import { Link, Outlet } from "react-router-dom";
import {
  Users,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const menuItems = [
    {
      to: "/admin/dashboard",
      label: "Tableau de bord",
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      to: "/admin/etudiants",
      label: "Étudiants",
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      to: "/admin/enseignants",
      label: "Enseignants",
      icon: <Users className="w-5 h-5" />
    },
    {
      to: "/admin/classes",
      label: "Classes",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      to: "/admin/matieres",
      label: "Matières",
      icon: <BookOpen className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin</h1>
                <p className="text-sm text-gray-500">Gestion scolaire</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="text-gray-500 group-hover:text-indigo-600">
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer with logout */}
          <div className="p-4 border-t space-y-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
            <div className="flex items-center justify-center p-3 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">Administration</p>
                <p className="text-xs text-gray-500 mt-1">Version 1.0</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Tableau de bord
              </h2>
              <div className="flex items-center space-x-4">
                <div className="hidden md:block text-sm text-gray-600">
                  {new Date().toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-indigo-600">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="bg-white rounded-2xl shadow-sm border min-h-[calc(100vh-140px)]">
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Système de Gestion Scolaire. Tous droits réservés.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}