import Link from 'next/link';

export default function Header({ config }) {
  const logo = config.logo || '/logo.png';
  const whatsapp = config.footer?.whatsapp || '56900000000';
  const nombre = config.nombre || 'Foodtruck';

  const links = [
    { id: 'hero', label: 'Inicio', href: '#inicio' },
    { id: 'nosotros', label: 'Nosotros', href: '#nosotros' },
    { id: 'menu', label: 'Menú', href: '#menu' },
    { id: 'experienciaInstagram', label: 'Experiencia', href: '#experiencia' },
    { id: 'footer', label: 'Contacto', href: '#footer' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md shadow z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
        <a href="#inicio" className="flex items-center">
          <img src={logo} alt={`Logo ${nombre}`} className="h-10 w-auto" />
        </a>

        <nav className="hidden md:flex space-x-8">
          {links
            .filter((link) => config.secciones?.includes(link.id))
            .map((link) => (
              <a key={link.id} href={link.href} className="text-white hover:text-red-600">
                {link.label}
              </a>
            ))}
        </nav>

        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
