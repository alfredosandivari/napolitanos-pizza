// components/Footer.jsx
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo y descripción */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src="/pizzas/logo.png" alt="Logo" className="w-24 mb-4" />
          <p className="text-sm text-gray-300">
            El sabor que recorre las calles. Pizzas artesanales, buena música y un ambiente inolvidable en Patio Rica Aventura.
          </p>
        </div>

        {/* Horarios y dirección */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2 text-red-400">📍 Dónde & Cuándo</h3>
          <p className="text-sm text-gray-300">Avenida Rica Aventura #11780, Antofagasta</p>
          <p className="text-sm text-gray-300 mt-2">
            ⏰ Lunes a Domingo<br />18:00 - 23:30 hrs
          </p>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <h3 className="text-lg font-semibold mb-2 text-red-400">🔗 Conéctate</h3>
          <div className="flex gap-4 text-white text-2xl">
            <a href="https://www.instagram.com/napolitanospizza.cl/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-red-500 transition" />
            </a>
            <a href="https://www.instagram.com/patioricaaventura/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-red-500 transition" />
            </a>
            <a href="https://wa.me/56944845291" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="hover:text-green-500 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Mapa de Google */}
      <div className="mt-12">
        <iframe
          title="Mapa"
          src="https://www.google.com/maps?q=Avenida+Rica+Aventura+11780,+Antofagasta&output=embed"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>

      {/* Línea final */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Tu Pizzería Foodtruck. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
