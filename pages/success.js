import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Success() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
    localStorage.removeItem('lastOrder');
  }, []);

  const total = order.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-4 text-gray-900">¡Gracias por tu pedido!</h1>
        <p className="text-gray-700 mb-6">
          En breve te contactaremos por WhatsApp para coordinar el retiro 🍕📱
        </p>

        {/* 🧾 Resumen del pedido */}
        {order.length > 0 && (
          <div className="text-left text-sm bg-white border border-gray-300 rounded p-4 mb-6 text-gray-800">
            <h2 className="font-bold mb-2 text-gray-900">Resumen del pedido:</h2>
            <ul className="space-y-1 mb-2">
              {order.map((item, index) => (
                <li key={index}>
                  {index + 1}. {item.name} ({item.size}{item.flavor ? `, ${item.flavor}` : ""}) - ${item.price.toLocaleString('es-CL')}
                </li>
              ))}
            </ul>
            <p className="font-bold text-right mt-2">💰 Total: ${total.toLocaleString('es-CL')}</p>
          </div>
        )}

        <Link href="/">
          <button className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition">
            Volver al inicio
          </button>
        </Link>
      </div>
    </div>
  );
}
