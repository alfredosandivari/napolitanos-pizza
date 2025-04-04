import { useState } from 'react';

export default function BebidaCard ({ name, options, addToCart }) {
    const [size, setSize] = useState(Object.keys(options)[0]); // Primer tamaño por defecto
    const [flavor, setFlavor] = useState(options[size].flavors[0]); // Primer sabor del tamaño seleccionado

    // Actualizar sabores disponibles al cambiar tamaño
    const handleSizeChange = (newSize) => {
        setSize(newSize);
        setFlavor(options[newSize].flavors[0]);
    };

    const price = options[size].price;

    return (
        <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="font-bold mt-2">Precio: ${price.toLocaleString('es-CL')}</p>

            {/* Selector de tamaño */}
            <select
                value={size}
                onChange={(e) => handleSizeChange(e.target.value)}
                className="mt-4 border rounded px-2 py-1 w-full"
            >
                {Object.keys(options).map((sz, idx) => (
                    <option key={idx} value={sz}>{sz}</option>
                ))}
            </select>

            {/* Selector de sabor */}
            <select
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                className="mt-4 border rounded px-2 py-1 w-full"
            >
                {options[size].flavors.map((flav, idx) => (
                    <option key={idx} value={flav}>{flav}</option>
                ))}
            </select>

            <button
                className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700 transition w-full"
                onClick={() => addToCart(name, size, flavor, options[size].price)}
            >
                Agregar al pedido
            </button>
        </div>
    );
};