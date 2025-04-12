import { useState } from 'react';

export default function ProductCard({ name, desc, image, options = {}, addToCart }) {
  const optionKey = Object.keys(options)[0] || '';
  const choices = options[optionKey] || {};

  const sizeOptions = Object.keys(choices).filter((k) => typeof choices[k] === 'number');
  const flavorOptions = choices.flavors || [];

  const [size, setSize] = useState(sizeOptions[0] || '');
  const [flavor, setFlavor] = useState(flavorOptions[0] || '');

  const price = sizeOptions.length > 0
    ? choices[size]
    : typeof choices === 'number'
    ? choices
    : 0;

  const handleAdd = () => {
    if (sizeOptions.length > 0 && !size) {
      alert('Selecciona un tamaño');
      return;
    }
    if (flavorOptions.length > 0 && !flavor) {
      alert('Selecciona un sabor');
      return;
    }

    addToCart(name, size || 'Único', flavorOptions.length > 0 ? flavor : null, price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      {desc && <p className="text-sm text-gray-600 mb-2">{desc}</p>}

      {/* Selector de tamaño */}
      {sizeOptions.length > 0 && (
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border rounded px-2 py-1 mb-2 w-full"
        >
          {sizeOptions.map((s) => (
            <option key={s} value={s}>
              {s} - ${choices[s]?.toLocaleString('es-CL')}
            </option>
          ))}
        </select>
      )}

      {/* Selector de sabor */}
      {flavorOptions.length > 0 && (
        <select
          value={flavor}
          onChange={(e) => setFlavor(e.target.value)}
          className="border rounded px-2 py-1 mb-2 w-full"
        >
          {flavorOptions.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      )}

      {/* Precio estático si no hay opciones */}
      {sizeOptions.length === 0 && flavorOptions.length === 0 && (
        <p className="font-bold mb-2">Precio: ${price.toLocaleString('es-CL')}</p>
      )}

      <button
        onClick={handleAdd}
        className="mt-auto bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
