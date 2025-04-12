import { useState } from 'react';

export default function MenuList({ menu, onAdd }) {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (productId, key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [key]: value,
      },
    }));
  };

  const handleAdd = (item) => {
    const opts = selectedOptions[item.id] || {};
    onAdd({
      ...item,
      ...opts, // como size, flavor, etc
    });
  };

  return (
    <div className="grid gap-4">
      {menu.map((item) => (
        <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
          <p className="text-gray-600 mb-2">Precio base: ${item.price.toLocaleString('es-CL')}</p>

          {/* Tamaños */}
          {item.options?.size && (
            <div className="mb-2">
              <label className="text-sm block mb-1 font-medium">Tamaño:</label>
              <select
                onChange={(e) =>
                  handleOptionChange(item.id, 'size', e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Seleccione</option>
                {item.options.size.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sabores */}
          {item.options?.flavor && (
            <div className="mb-2">
              <label className="text-sm block mb-1 font-medium">Sabor:</label>
              <select
                onChange={(e) =>
                  handleOptionChange(item.id, 'flavor', e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Seleccione</option>
                {item.options.flavor.map((flavor) => (
                  <option key={flavor} value={flavor}>
                    {flavor}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={() => handleAdd(item)}
            className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-bold transition"
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}
