import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import "./app.css";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Professional header with gradient */}
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">User Management System</h1>
            <nav className="nav-links">
              <a href="/login" className="nav-link">Login</a>
              <a href="/signup" className="nav-link">Signup</a>
            </nav>
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;