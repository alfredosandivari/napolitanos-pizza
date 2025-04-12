import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = ({ config }) => {
  const {
    nombre,
    logo,
    footer: {
      fondo = '#1f2937', // gray-900
      descripcion,
      direccion,
      horario,
      instagram = [],
      whatsapp,
      mapaEmbedUrl,
    } = {}
  } = config || {};

  return (
    <footer id="footer" className="text-white py-12 px-6" style={{ backgroundColor: fondo }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo y descripción */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          {logo && <img src={logo} alt="Logo" className="w-24 mb-4" />}
          <p className="text-sm text-gray-300">
            {descripcion || `El sabor que recorre las calles. Disfruta nuestras preparaciones artesanales.`}
          </p>
        </div>

        {/* Dirección y horario */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2 text-red-400">📍 Dónde & Cuándo</h3>
          <p className="text-sm text-gray-300">{direccion || 'Ubicación no especificada'}</p>
          {horario && (
            <p className="text-sm text-gray-300 mt-2">
              ⏰ {horario.dias} <br />{horario.horas}
            </p>
          )}
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <h3 className="text-lg font-semibold mb-2 text-red-400">🔗 Conéctate</h3>
          <div className="flex gap-4 text-white text-2xl">
            {instagram?.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:text-red-500 transition" />
              </a>
            ))}
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="hover:text-green-500 transition" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mapa embebido */}
      {mapaEmbedUrl && (
        <div className="mt-12">
          <iframe
            title="Mapa"
            src={mapaEmbedUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      )}

      {/* Pie final */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} {nombre || 'Tu Pizzería Foodtruck'}. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
