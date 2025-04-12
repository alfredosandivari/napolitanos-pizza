import { useState } from 'react';

export default function ProductCard({ name, desc, image, options, addToCart }) {
  const productData = options?.[name] || {};
  const sizes = Object.keys(productData).filter(k => k !== 'flavors');
  const flavors = productData?.flavors || [];

  const [size, setSize] = useState(sizes[0] || '');
  const [flavor, setFlavor] = useState(flavors[0] || '');

  const handleAddToCart = () => {
    const price = productData[size];
    addToCart(name, size, flavor || null, price);
  };

  return (
    <div className="h-[500px] bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full">
      <img
        src={image || '/images/default-product.png'}
        alt={name}
        onError={(e) => e.currentTarget.src = '/images/default-product.png'}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-4">{desc}</p>

      <div className="mt-auto space-y-3">
        {/* Selector de tamaño SOLO si hay más de uno */}
        {sizes.length > 1 && (
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s} - ${productData[s].toLocaleString('es-CL')}
              </option>
            ))}
          </select>
        )}

        {/* Selector de sabor SOLO si hay sabores definidos */}
        {flavors.length > 0 && (
          <select
            value={flavor}
            onChange={(e) => setFlavor(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            {flavors.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
