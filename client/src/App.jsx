import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./pages/Navigation";
import Sidebar from "./pages/Sidebar";
import HeroSection from "./pages/HeroSection";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Uploads from "./pages/Uploads";
import "./App.css";

// Layout component with NavBar + Sidebar
function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col h-screen">
      <NavBar onToggleSidebar={handleToggleSidebar} />
      <div className="flex flex-1">
        {/* Mobile Sidebar */}
        <Sidebar isMobile={sidebarOpen} onClose={handleCloseSidebar} />

        {/* Mobile backdrop when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={handleCloseSidebar}
          />
        )}

        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HeroSection />
          </MainLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/reports"
        element={
          <MainLayout>
            <Reports />
          </MainLayout>
        }
      />
      <Route
        path="/uploads"
        element={
          <MainLayout>
            <Uploads />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
