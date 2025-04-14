import { useRouter } from 'next/router';
import { foodtrucks } from '@/platix.config';

export default function FailurePage() {
  const router = useRouter();
  const { foodtruckId } = router.query;
  const config = foodtrucks[foodtruckId];

  if (!config) return <p className="text-center mt-12">Cargando información...</p>;

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center text-center px-4 py-12">
      <img src={config.logo} alt={config.nombre} className="w-32 mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-4">❌ Pago rechazado</h1>
      <p className="text-gray-700 mb-2">
        Tu pago no se pudo procesar correctamente.
      </p>
      <p className="text-gray-600 mb-4">
        Puedes intentar nuevamente o revisar los datos ingresados. Si el problema persiste, contáctanos por WhatsApp 📲
      </p>
      <a
        href={`https://wa.me/${config.whatsapp || config.telefono}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Contactar por WhatsApp
      </a>
    </div>
  );
}
