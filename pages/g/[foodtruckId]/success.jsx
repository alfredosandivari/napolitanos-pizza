import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { foodtrucks } from '@/platix.config';

export default function SuccessPage() {
  const router = useRouter();
  const [config, setConfig] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const { foodtruckId } = router.query;
    const id = Array.isArray(foodtruckId) ? foodtruckId[0] : foodtruckId;
    const found = foodtrucks[id];
    if (found) setConfig(found);

    const stored = localStorage.getItem('pendingOrder');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setOrder(parsed);
        localStorage.removeItem('pendingOrder');
      } catch (e) {
        console.error('Error al leer pedido:', e);
      }
    }
  }, [router.isReady, router.query]);

  if (!config || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando confirmación...</p>
      </div>
    );
  }

  const { cart = [], customer = {} } = order;
  const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const entregaTexto =
    customer.deliveryOption === 'programado' && customer.schedule
      ? `Programado para las ${customer.schedule}`
      : 'Retiro inmediato en el local';

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center px-4 py-12">
      <img src={config.logo} alt={config.nombre} className="w-28 mb-4" />
      <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 ¡Pedido realizado con éxito!</h1>
      <p className="text-lg text-gray-700 mb-2">
        Gracias por tu compra {customer.name ? `, ${customer.name}` : ''}. El equipo de <strong>{config.nombre}</strong> ya está preparando tu pedido 🍕
      </p>
      <p className="text-sm text-gray-600 mb-6">{entregaTexto}</p>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-left">
        <h2 className="text-xl font-bold mb-4">🧾 Detalle del pedido:</h2>
        <ul className="space-y-2">
          {cart.map((item, index) => (
            <li key={index} className="text-gray-800">
              {item.quantity || 1}x {item.name}
              {item.size && ` (${item.size})`}
              {item.flavor && `, ${item.flavor}`}
              <span className="float-right font-medium">
                ${ (item.price * (item.quantity || 1)).toLocaleString('es-CL') }
              </span>
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <div className="text-right font-bold text-lg">
          Total: ${total.toLocaleString('es-CL')}
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-500">Nos vemos pronto en <strong>{config.nombre}</strong> 🙌</p>
    </div>
  );
}
