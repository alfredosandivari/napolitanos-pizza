// app/(platix)/checkout/pending/page.jsx

import Link from "next/link";
import { CheckCircle, Clock } from "lucide-react";

export default function PendingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-6">
      <Clock className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Pago pendiente</h1>
      <p className="text-gray-700 mb-4 max-w-md">
        Hemos recibido tu pedido, pero el pago aún está en proceso. Te avisaremos por WhatsApp y correo electrónico cuando se confirme.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-5 py-2 text-white hover:bg-yellow-600 transition"
      >
        <CheckCircle className="w-5 h-5" />
        Volver al inicio
      </Link>
    </div>
  );
}
