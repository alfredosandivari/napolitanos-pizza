import Link from 'next/link';

export default function Header() {
  return (
        <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md shadow z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
        <a href="#" className="flex items-center">
            <img src="/pizzas/logo.png" alt="Logo" className="h-10 w-auto" />
        </a>
        <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-white hover:text-red-600">Inicio</a>
            <a href="#menu" className="text-white hover:text-red-600">Menú</a>
            <a href="#footer" className="text-white hover:text-red-600">Contacto</a>
        </nav>
        <a
            href="https://wa.me/56944845291"
            target="_blank"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
            WhatsApp
        </a>
        </div>
    </header>
  );
}