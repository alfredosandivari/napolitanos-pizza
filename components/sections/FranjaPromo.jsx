const FranjaPromo = ({ promo }) => {
  const {
    texto = '🎉 ¡Ambiente único y sabor que no falla! 🍕🎶',
    color = '#e63946',
  } = promo || {};

  return (
    <section className="py-8" style={{ backgroundColor: color }}>
      <h2 className="text-center text-white text-2xl md:text-3xl font-bold tracking-wide">
        {texto}
      </h2>
    </section>
  );
};

export default FranjaPromo;
