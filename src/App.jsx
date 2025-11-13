// src/App.jsx
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  const navigate = useNavigate();

  // función que se ejecuta cuando el login es correcto
  const handleLoginSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLoginSuccess} />} />

      <Route
        path="/dashboard"
        element={
          <>
            <Navbar />
            <Sidebar />
            <Dashboard />
          </>
        }
      />
    </Routes>
  );
}

export default App;
