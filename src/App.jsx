// src/App.jsx
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard"; // 👈 importa el dashboard

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6">
          <Dashboard /> {/* 👈 aquí mostramos el panel principal */}
        </main>
      </div>
    </div>
  );
}

export default App;
