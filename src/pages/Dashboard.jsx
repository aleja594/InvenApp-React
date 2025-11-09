import { BarChart3, Users, Package, Truck, ArrowLeftRight, FileText } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Productos", value: "152", icon: <Package className="text-main" size={24} /> },
    { title: "Clientes", value: "89", icon: <Users className="text-main" size={24} /> },
    { title: "Proveedores", value: "12", icon: <Truck className="text-main" size={24} /> },
    { title: "Movimientos", value: "347", icon: <ArrowLeftRight className="text-main" size={24} /> },
    { title: "Informes", value: "5", icon: <FileText className="text-main" size={24} /> },
  ];

  return (
    <main className="flex-1 bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel principal</h1>

      {/* Sección de tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-3">
              {item.icon}
              <span className="text-2xl font-semibold text-gray-700">{item.value}</span>
            </div>
            <h2 className="text-gray-500 font-medium">{item.title}</h2>
          </div>
        ))}
      </div>

      {/* Gráfico o resumen general */}
      <section className="mt-10 bg-white p-6 rounded-2xl shadow">
        <div className="flex items-center mb-4">
          <BarChart3 className="text-main mr-3" size={28} />
          <h2 className="text-xl font-semibold text-gray-800">Resumen de actividad</h2>
        </div>
        <p className="text-gray-600">
          Aquí podrás ver un resumen de los movimientos recientes, ingresos, salidas y actividad general del inventario.
          (En el futuro agregaremos gráficos interactivos y estadísticas en tiempo real.)
        </p>
      </section>
    </main>
  );
}