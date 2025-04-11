// pages/success.jsx
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedOrder = localStorage.getItem('pendingOrder');
    if (storedOrder) {
      try {
        const parsed = JSON.parse(storedOrder);
        setCart(parsed.cart || []);
        // Solo visual: no disparar más el pedido
        localStorage.removeItem('pendingOrder');
      } catch (err) {
        console.error('Error al leer pendingOrder:', err);
      }
    }
  }, []);

  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center px-4 py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 ¡Pedido realizado con éxito!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Gracias por tu compra. Tu pedido fue recibido y está siendo preparado con amor 🍕
      </p>
      <p className="text-sm text-gray-600 mb-6">
        Te enviamos un correo con los detalles de tu pedido. ¡Nos vemos pronto! 🍕
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-left">🧾 Detalle del pedido:</h2>
        <ul className="text-left space-y-2">
          {cart.map((item, index) => (
            <li key={index} className="text-gray-800">
              {index + 1}. {item.name} ({item.size}{item.flavor ? `, ${item.flavor}` : ''}) - ${item.price.toLocaleString('es-CL')}
            </li>
          ))}
        </ul>
        <div className="text-right mt-4 font-bold text-lg">
          Total: ${total.toLocaleString('es-CL')}
        </div>
      </div>

      <Link href="/" className="mt-8 inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
        Volver al inicio
      </Link>
    </div>
  );
}
