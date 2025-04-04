import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <img src="/pizzas/logo.png" alt="Logo" className="h-10 w-auto cursor-pointer" />
        </Link>

        {/* Menú desktop */}
        <nav className="hidden md:flex space-x-6">
          <a href="#inicio" className="text-gray-700 hover:text-red-600 transition font-medium">Inicio</a>
          <a href="#menu" className="text-gray-700 hover:text-red-600 transition font-medium">Menú</a>
          <a href="#contacto" className="text-gray-700 hover:text-red-600 transition font-medium">Contacto</a>
        </nav>

        {/* WhatsApp botón */}
        <a
          href="https://wa.me/56963424158"
          target="_blank"
          className="hidden md:inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          WhatsApp
        </a>

        {/* Menú mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-4 space-y-4 shadow-md">
          <a href="#inicio" className="block text-gray-700 hover:text-red-600 transition">Inicio</a>
          <a href="#menu" className="block text-gray-700 hover:text-red-600 transition">Menú</a>
          <a href="#contacto" className="block text-gray-700 hover:text-red-600 transition">Contacto</a>
          <a
            href="https://wa.me/56963424158"
            target="_blank"
            className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-center"
          >
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
