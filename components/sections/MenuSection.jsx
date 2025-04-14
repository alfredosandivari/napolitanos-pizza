const MenuSection = ({ menu, addToCart, ProductCard }) => {
  return (
    <section id="menu" className="py-16 px-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">🍽️ Nuestro Menú</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
        {menu?.map((item) => (
          <ProductCard
            key={item.id}
            name={item.name}
            desc={item.desc}
            image={item.image}
            variants={item.variants}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
