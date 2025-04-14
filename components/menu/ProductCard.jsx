import { useState, useEffect } from 'react';

export default function ProductCard({ name, desc, image, variants, addToCart }) {
    if (!Array.isArray(variants) || variants.length === 0) {
        return (
            <div className="h-[500px] bg-gray-100 rounded-lg shadow-md p-4 flex flex-col justify-center items-center text-center">
                <p className="text-gray-500">Producto sin variantes</p>
            </div>
        );
    }
    const [selectedVariant, setSelectedVariant] = useState(null);

    // Determina si los variants tienen 'size', 'flavor' o solo un flavor repetido
    const hasSizes = variants.some(v => v.size);
    const hasFlavors = variants.some(v => v.flavor);
    const uniquePrices = new Set(variants.map(v => v.price));
    const uniformPrice = uniquePrices.size === 1;

    // Agrupa por tamaño si aplica
    const sizes = hasSizes
        ? [...new Set(variants.map(v => v.size).filter(Boolean))]
        : [];

    const flavors = hasFlavors
        ? [...new Set(variants.map(v => v.flavor).filter(Boolean))]
        : [];

    // Estado de selectores
    const [selectedSize, setSelectedSize] = useState(sizes[0] || '');
    const [selectedFlavor, setSelectedFlavor] = useState(flavors[0] || '');

    // Actualiza el variant seleccionado
    useEffect(() => {
        let match;
        if (hasSizes && hasFlavors) {
            match = variants.find(v => v.size === selectedSize && v.flavor === selectedFlavor);
        } else if (hasSizes) {
            match = variants.find(v => v.size === selectedSize);
        } else if (hasFlavors) {
            match = variants.find(v => v.flavor === selectedFlavor);
        } else {
            match = variants[0]; // único variant
        }
        setSelectedVariant(match);
    }, [selectedSize, selectedFlavor, variants]);

    const handleAddToCart = () => {
        if (!selectedVariant) return;
        addToCart(name, selectedVariant.size || null, selectedVariant.flavor || null, selectedVariant.price);
    };

    return (
        <div className="h-[400px] bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
            <img
                src={image || '/images/default-product.png'}
                alt={name}
                onError={(e) => e.currentTarget.src = '/images/default-product.png'}
                className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <p className="text-gray-600 text-sm mb-4">{desc}</p>

            <div className="mt-auto space-y-3">
                {/* Selector tamaño */}
                {hasSizes && sizes.length > 1 && (
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        {sizes.map((s) => {
                            const variant = variants.find(v => v.size === s);
                            return (
                                <option key={s} value={s}>
                                    {s} - ${variant?.price?.toLocaleString('es-CL')}
                                </option>
                            );
                        })}
                    </select>
                )}

                {!hasSizes && hasFlavors && uniformPrice && selectedVariant && (
                    <p className="text-gray-800 text-base font-semibold text-center">
                        Precio: ${selectedVariant.price.toLocaleString('es-CL')}
                    </p>
                )}

                {/* Selector sabor */}
                {hasFlavors && flavors.length > 1 && (
                    <select
                        value={selectedFlavor}
                        onChange={(e) => setSelectedFlavor(e.target.value)}
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
                    disabled={!selectedVariant}
                >
                    Agregar
                </button>   
            </div>
        </div>
    );
}
