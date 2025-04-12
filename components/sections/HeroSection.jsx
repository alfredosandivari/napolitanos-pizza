const HeroSection = ({ hero }) => {
  const {
    titulo = '¡Bienvenido!',
    descripcion = 'Prueba nuestras especialidades al paso con el mejor sabor.',
    fondo = "/pizzas/fondo-pizza.jpg"
  } = hero || {};

  return (
    <section
      id="inicio"
      className="relative flex items-center justify-center text-center h-120 bg-cover bg-center"
      style={{ backgroundImage: `url('${fondo}')` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-white px-4">
        <h1
          className="text-4xl md:text-6xl font-bold mb-4"
          dangerouslySetInnerHTML={{ __html: titulo }}
        />
        <p
          className="text-lg md:text-xl mb-6"
          dangerouslySetInnerHTML={{ __html: descripcion }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
