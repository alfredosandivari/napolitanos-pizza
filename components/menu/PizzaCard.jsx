import { useState } from 'react';

export default function PizzaCard({ name, desc, image, addToCart, options }) {
  const [size, setSize] = useState('Personal');

    return (
        <div className="bg-white p-6 rounded-lg shadow text-center flex flex-col h-full">
        <img src={image} alt={`Pizza ${name}`} className="w-full h-40 object-cover rounded-lg mb-4" />
        
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-600">{desc}</p>

        {/* ⬇️ Este div crece para empujar lo siguiente hacia abajo */}
        <div className="flex-grow"></div>

        {/* Zona de acción abajo */}
        <div className="mt-auto">
            <p className="font-bold mt-2">Precio: ${options[name][size].toLocaleString('es-CL')}</p>

            {/* Selector de tamaño */}
            <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mt-4 border rounded px-2 py-1 w-full"
            >
            <option value="Personal">Personal</option>
            <option value="Compartida">Compartida</option>
            </select>

            <button
            className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700 transition w-full"
            onClick={() => addToCart(name, size, null, options[name][size])}
            >
            Agregar al pedido
            </button>
        </div>
        </div>
    );
}