import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { foodtrucks } from '@/platix.config';

export default function FailurePage() {
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
        <p className="text-gray-500">Cargando error...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center text-center px-4 py-12">
      <h1 className="text-4xl font-bold text-red-700 mb-4">😢 ¡Algo salió mal!</h1>
      <p className="text-lg text-gray-700 mb-4">
        No pudimos completar el pago en <strong>{config.nombre}</strong>.
      </p>
      <p className="text-gray-600">Te invitamos a intentarlo nuevamente. Si el problema persiste, contáctanos.</p>
    </div>
  );
}
