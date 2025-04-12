import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { foodtrucks } from '@/platix.config';

export default function SuccessPage() {
  const router = useRouter();
  const [config, setConfig] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;

    const { foodtruckId } = router.query;
    const id = Array.isArray(foodtruckId) ? foodtruckId[0] : foodtruckId;
    const found = foodtrucks[id];

    if (found) {
      setConfig(found);
    }

    const stored = localStorage.getItem('pendingOrder');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCart(parsed.cart || []);
        localStorage.removeItem('pendingOrder');
      } catch (e) {
        console.error('Error al leer carrito:', e);
      }
    }
  }, [router.isReady, router.query]);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando confirmación...</p>
      </div>
    );
  }

  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center px-4 py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 ¡Pedido realizado con éxito!</h1>
      <p className="text-lg text-gray-700 mb-2">
        Gracias por tu compra. El equipo de <strong>{config.nombre}</strong> ya está preparando tu pedido 🍕
      </p>
      <p className="text-sm text-gray-600 mb-6">
        Te enviamos un correo con los detalles. ¡Nos vemos pronto!
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
    </div>
  );
}
