import { useState } from 'react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Header2 from '@/components/layout/Header2';
import PizzaCard from '@/components/menu/PizzaCard';
import BebidaCard from '@/components/menu/BebidaCard';
import { AnimatePresence, motion } from 'framer-motion';
import CheckoutForm from '@/components/CheckoutForm'; // ajusta ruta si es necesario


export default function Home() {
    const [cart, setCart] = useState([]);

    // Precios según tamaño
    const pizzaOptions = {
        Margarita: { Personal: 5000, Compartida: 8500 },
        Pepperoni: { Personal: 9500, Compartida: 14000 },
        Napolitana: { Personal: 10000, Compartida: 15000 },
        "Del Huerto": { Personal: 6000, Compartida: 10500 },
        Hawaiana: { Personal: 6000, Compartida: 10500 },
        Mediterranea: { Personal: 6500, Compartida: 11500 },
        Campestre: { Personal: 6500, Compartida: 11500 },
        Española: { Personal: 7000, Compartida: 12500 },
        Serrano: { Personal: 7000, Compartida: 12500 },
        "Mix de carnes": { Personal: 7000, Compartida: 12500 },
        Diavola: { Personal: 7000, Compartida: 12500 },
    };

    const bebidasOptions = {
        "1.5 L": { price: 2800, flavors: ["Coca-Cola", "Fanta", "Sprite", "Pepsi", "Pepsi Zero", "Limon Soda"] },
        "Lata": { price: 1500, flavors: ["Coca-Cola", "Fanta", "Sprite", "Pepsi", "Pepsi Zero", "Limon Soda"] },
    };

    const addToCart = (name, size, flavor = null, price) => {
        console.log("Agregando al carrito:", { name, size, flavor, price }); // Verificar que esté llegando todo
        setCart([...cart, { name, size, flavor, price }]);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const sendWhatsAppOrder = () => {
        if (cart.length === 0) {
            alert('No has agregado nada al pedido!');
            return;
        }
        const orderText = cart
            .map((item, i) => `${i + 1}. ${item.name} (${item.size}${item.flavor ? `, ${item.flavor}` : ""}) - $${item.price.toLocaleString('es-CL')}`)
            .join('%0A');
        const phoneNumber = "569XXXXXXXX"; // Tu número
        window.open(`https://wa.me/${phoneNumber}?text=Hola! Quiero pedir:%0A${orderText}`);
    };

    const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);
    // Estado del formulario de finalizar el carro
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">

            <Header />

            {/* Hero Section */}
            <section
                id="inicio"
                className="relative flex items-center justify-center text-center h-120 bg-cover bg-center"
                style={{ backgroundImage: "url('/pizzas/fondo-pizza.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Texto Hero */}
                <div className="relative z-10 text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">¡Las mejores pizzas sobre ruedas! 🍕🚚</h1>
                    <p className="text-lg md:text-xl mb-6">Prueba nuestras pizzas artesanales hechas con ingredientes frescos.</p>
                </div>
            </section>

            {/* Sección Nosotros */}
            <section id="nosotros" className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    {/* Imagen del Foodtruck */}
                    <div className="flex justify-center">
                        <img
                            src="/pizzas/foodtruck.jpg" // ✅ Tu imagen vertical
                            alt="Nuestro Foodtruck"
                            className="rounded-lg shadow-lg w-full h-[500px] object-bottom object-cover"
                        />
                    </div>

                    {/* Texto descriptivo */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">🎉 ¡Vive la experiencia del Foodtruck!</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            Somos un foodtruck ubicado en <strong>Patio Rica Aventura</strong>, un espacio gastronómico único donde puedes disfrutar nuestras pizzas artesanales al aire libre.
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            Los <strong>fines de semana</strong> encendemos el ambiente con <strong>karaoke y música en vivo</strong>, ideal para venir con amigos o en familia.
                            Acompaña tus pizzas favoritas con nuestras bebidas bien heladas y pasa una velada inolvidable.
                        </p>
                        <p className="text-lg text-gray-700">
                            ¡Te esperamos para disfrutar de buena comida, música y diversión! 🍕🎶🎤
                        </p>
                    </div>

                </div>
            </section>

            <section className="bg-red-600 py-8">
                <h2 className="text-center text-white text-2xl md:text-3xl font-bold tracking-wide">
                    🎉 ¡Ven a disfrutar de la mejor pizza, música y ambiente en Patio Rica Aventura! 🍕🎶
                </h2>
            </section>

            
            <section id="menu" className="py-16 px-8 max-w-5xl mx-auto">
                {/* Menú de Pizzas */}
                <h2 className="text-3xl font-bold text-center mb-12">🍕 Nuestro Menú</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">

                    {/* Pizza Cards */}
                    <PizzaCard
                        name="Margarita"
                        desc="Pizza con base de salsa pomodoro, mozzarella, albahaca fresca y un toque de aceite de oliva."
                        image="/pizzas/margarita.jpg" addToCart={addToCart}
                        options={pizzaOptions}
                    />
                    <PizzaCard
                        name="Pepperoni"
                        desc="Pizza con base de salsa pomodoro, mozzarella y pepperoni."
                        image="/pizzas/pepperoni.jpg"
                        addToCart={addToCart}
                        options={pizzaOptions}
                    />
                    <PizzaCard
                        name="Napolitana"
                        desc="Pizza con base de salsa pomodoro, mozzarella, jamón artesanal, tomate y un toque de orégano."
                        image="/pizzas/napolitana.jpg"
                        addToCart={addToCart}
                        options={pizzaOptions}
                    />
                    <PizzaCard
                        name="Del Huerto"
                        desc="Pizza con base de salsa pomodoro, mozzarella, champiñon, tomate cherry, mix de pimentones y albahaca fresca."
                        image="/pizzas/napolitana.jpg"
                        addToCart={addToCart}
                        options={pizzaOptions}
                    />

                    <PizzaCard
                        name="Hawaiana"
                        desc="Pizza con base de salsa mozzarella, jamón artesanal piña."
                        image="/pizzas/napolitana.jpg"
                        addToCart={addToCart}
                        options={pizzaOptions}
                    />
                    <PizzaCard
                        name="Mediterranea"
                        desc="Pizza con base de salsa pomodoro, mozzarella, cebolla morada, pimentón, tomate, aceitunas negras y un toque de orégano."
                        image="/pizzas/napolitana.jpg"
                        addToCart={addToCart}
                        options={pizzaOptions}
                    />
                    <PizzaCard
                        name="Campestre"
                        desc="Pizza con base de salsa pomodoro, mozzarella, champiñones, tomate cherry y chorizo artesanal."
                        image="/pizzas/napolitana.jpg"
                        addToCart={addToCart}
                        options={pizzaOptions}
                    />
                    <PizzaCard
                        name="Española"
                        desc="Pizza con base de salsa pomodoro, mozzarella, chorizo artesanal, pimentón, cebolla morada y tomate."
                        image="/pizzas/napolitana.jpg"
                        addToCart={addToCart}
                        options={pizzaOptions}
                    />
                    <PizzaCard
                        name="Serrano"
                        desc="Pizza con base de salsa pomodoro, mozzarella, jamón serrano y tomate cherry."
                        image="/pizzas/napolitana.jpg"
                        addToCart={addToCart}
                        options={pizzaOptions}
                    />
                    <PizzaCard
                        name="Mix de carnes"
                        desc="Pizza con base de salsa pomodoro, mozzarella, salame, chorizo y jamón artesanal."
                        image="/pizzas/napolitana.jpg"
                        addToCart={addToCart}
                        options={pizzaOptions}
                    />
                    <PizzaCard
                        name="Diavola"
                        desc="Pizza con base de salsa pomodoro, mozzarella, mitad salame y mitad pepperoni con jamón artesanal, tomate y aceitunas negras."
                        image="/pizzas/napolitana.jpg"
                        addToCart={addToCart}
                        options={pizzaOptions}
                    />
                </div>

                {/* Sección de Productos Adicionales */}
                <h2 className="text-3xl font-bold text-center mb-12 mt-10">🍕 Adicionales</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Bebidas */}
                    <BebidaCard
                        name="Bebida"
                        options={bebidasOptions}
                        addToCart={addToCart}
                    />
                </div>
            </section>

            <section id="experiencia" className="py-16 bg-white text-gray-800">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
                    🎥 Vive la experiencia en <span className="text-red-600">Patio Rica Aventura</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    
                    {/* Texto simple pero con carácter */}
                    <div className="text-left md:text-lg leading-relaxed font-medium">
                        <p className="text-2xl font-semibold mb-4">
                        Música en vivo, karaoke y las mejores pizzas al aire libre.
                        </p>
                        <p className="mb-4">
                        Cada fin de semana creamos un ambiente único donde el sabor, la música y la buena compañía se encuentran.
                        Disfruta nuestras pizzas artesanales acompañadas de bebidas heladas y mucha buena onda 🎶🍕
                        </p>
                        <p className="italic text-red-600">
                        ¡Una experiencia que va más allá del sabor!
                        </p>
                    </div>

                    {/* Reel embed */}
                    <div className="flex justify-center">
                        <iframe
                        src="https://www.instagram.com/reel/DHEkWysJvEX/embed"
                        width="320"
                        height="480"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency="true"
                        allow="encrypted-media"
                        className="rounded-xl shadow-md"
                        ></iframe>
                    </div>

                    </div>
                </div>
            </section>



            {/* 🛒 Carrito flotante + Checkout */}
            <AnimatePresence>
                {!showForm && cart.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-4 right-4 w-80 bg-white shadow-lg p-4 rounded-lg z-40"
                    >
                        <h3 className="font-bold text-lg mb-2">🛒 Tu Pedido ({cart.length})</h3>

                        <ul className="space-y-2 max-h-40 overflow-y-auto text-sm">
                            {cart.map((item, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span>
                                        {item.name} ({item.size}{item.flavor ? `, ${item.flavor}` : ""}) - ${item.price.toLocaleString('es-CL')}
                                    </span>
                                    <button
                                        onClick={() => removeFromCart(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="text-right font-bold text-lg mt-4">
                            Total: ${total.toLocaleString('es-CL')}
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-red-600 text-white w-full py-3 rounded mt-4 hover:bg-red-700 transition"
                        >
                            Finalizar pedido
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 📋 Formulario Checkout */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        key="checkout"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-white overflow-auto p-4 flex items-center justify-center"
                    >
                        <div className="w-full max-w-md">
                            <CheckoutForm cart={cart} onCancel={() => setShowForm(false)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Contacto */}
            <Footer />
        </div>
    );
}


