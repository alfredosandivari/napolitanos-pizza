import { useRouter } from 'next/router';
import { foodtrucks } from '@/platix.config';

export default function PendingPage() {
  const router = useRouter();
  const { foodtruckId } = router.query;
  const config = foodtrucks[foodtruckId];

  if (!config) return <p className="text-center mt-12">Cargando información...</p>;

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center text-center px-4 py-12">
      <img src={config.logo} alt={config.nombre} className="w-32 mb-4" />
      <h1 className="text-3xl font-bold text-yellow-800 mb-4">⏳ Pago en proceso</h1>
      <p className="text-gray-700 mb-2">
        ¡Hola! Estamos esperando la confirmación del pago con MercadoPago.
      </p>
      <p className="text-gray-600">
        En unos segundos deberías recibir un mensaje confirmando tu pedido. Si no pasa nada, puedes
        escribirnos directamente por WhatsApp para revisar tu orden 📲
      </p>
    </div>
  );
}
