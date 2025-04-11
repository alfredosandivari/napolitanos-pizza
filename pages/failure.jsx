// pages/failure.jsx
import Link from 'next/link';

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center text-center px-4 py-12">
      <h1 className="text-4xl font-bold text-red-700 mb-4">❌ Pago no procesado</h1>
      <p className="text-lg text-gray-700 mb-6">
        Hubo un problema al procesar tu pago. Puede que se haya cancelado o haya fallado.
      </p>
      <p className="text-gray-600 mb-8">
        Si crees que es un error, intenta nuevamente o contáctanos por WhatsApp.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <Link href="/">
          <a className="bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400 transition">
            Volver al inicio
          </a>
        </Link>
        <a
          href="https://wa.me/56963424158"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  );
}
