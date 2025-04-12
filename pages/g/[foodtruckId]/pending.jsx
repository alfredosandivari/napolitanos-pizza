import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { foodtrucks } from '@/platix.config';
import { Clock } from 'lucide-react';

export default function PendingPage() {
  const router = useRouter();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const { foodtruckId } = router.query;
    const id = Array.isArray(foodtruckId) ? foodtruckId[0] : foodtruckId;
    setConfig(foodtrucks[id] || null);
  }, [router.isReady, router.query]);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <p className="text-gray-500">Cargando estado de pago...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center text-center px-4 py-12">
      <Clock className="w-12 h-12 text-yellow-500 mb-4" />
      <h1 className="text-3xl font-bold text-yellow-700 mb-2">⏳ Pago en proceso</h1>
      <p className="text-gray-700 mb-2">
        Estamos esperando la confirmación de Mercado Pago para tu pedido en <strong>{config.nombre}</strong>.
      </p>
      <p className="text-sm text-gray-600">Te avisaremos apenas esté confirmado.</p>
    </div>
  );
}
