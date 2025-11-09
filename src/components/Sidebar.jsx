import { Home, Users, Package, Truck, BarChart3, UserCog, HelpCircle, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#839af3] text-white min-h-screen flex flex-col justify-between">
      <div>
        <div className="p-5 text-2xl font-bold border-b border-white/20">
          InvenApp
        </div>
        <nav className="mt-6 flex flex-col gap-2">
          <a href="#dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#6f86e9] transition-colors">
            <Home size={20} />
            Dashboard
          </a>

          <a href="#clientes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#6f86e9] transition-colors">
            <Users size={20} />
            Clientes / Proveedores
          </a>

          <a href="#productos" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#6f86e9] transition-colors">
            <Package size={20} />
            Productos
          </a>

          <a href="#movimientos" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#6f86e9] transition-colors">
            <Truck size={20} />
            Ingreso / Salida
          </a>

          <a href="#usuarios" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#6f86e9] transition-colors">
            <UserCog size={20} />
            Usuarios
          </a>

          <a href="#informes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#6f86e9] transition-colors">
            <BarChart3 size={20} />
            Informes / Auditoría
          </a>
        </nav>
      </div>

      <div className="p-4 border-t border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle size={20} className="cursor-pointer hover:text-gray-200" title="Ayuda" />
            <LogOut size={20} className="cursor-pointer hover:text-gray-200" title="Cerrar sesión" />
          </div>
          <span className="text-sm font-medium">Mayra Sierra</span>
        </div>
      </div>
    </aside>
  );
}
