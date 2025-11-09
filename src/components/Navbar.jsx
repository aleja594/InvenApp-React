// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-700">Panel principal</h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-700 font-medium">Mayra Sierra</span>
        <img
          src="https://ui-avatars.com/api/?name=Mayra+Sierra"
          alt="Usuario"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      </div>
    </header>
  );
}
