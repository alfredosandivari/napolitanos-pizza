const NosotrosSection = ({ nosotros }) => {
  const {
    titulo = '🎉 ¡Vive la experiencia del Foodtruck!',
    parrafos = [],
    imagen = '/pizzas/foodtruck.jpg',
  } = nosotros || {};

  return (
    <section id="nosotros" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Imagen */}
        <div className="flex justify-center">
          <img
            src={imagen}
            alt="Nuestro Foodtruck"
            className="rounded-lg shadow-lg w-full h-[500px] object-bottom object-cover"
          />
        </div>

        {/* Texto */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{titulo}</h2>
          {parrafos.map((p, idx) => (
            <p key={idx} className="text-lg text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NosotrosSection;
