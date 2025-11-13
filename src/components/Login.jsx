import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import imagen from "../assets/imageninven.png";

function Login({ onLogin }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          correo,
          contrasena,
        }
      );

      if (response.data.success) {
        setError("");
        onLogin(); // cambia al menú principal
      } else {
        setError(response.data.message || "Correo o contraseña incorrectos ❌");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);

      // Si backend responde con código 401 → credenciales incorrectas
      if (err.response && err.response.status === 401) {
        setError("Correo o contraseña incorrectos ❌");
      } else {
        // Error real del servidor
        setError("Hubo un problema al conectar con el servidor 🚨");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 bg-white flex flex-col justify-center items-center shadow-lg">
        <img src={logo} alt="Logo" className="w-32 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="w-3/4 max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700">Correo electrónico</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-center mb-3 font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
          >
            Entrar
          </button>
        </form>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <img src={imagen} alt="Imagen Inventario" className="w-3/4" />
      </div>
    </div>
  );
}

export default Login;
