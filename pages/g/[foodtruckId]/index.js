import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { foodtrucks } from '@/platix.config';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CheckoutForm from '@/components/CheckoutForm';
import ProductCard from '@/components/menu/ProductCard';

// Módulos de página
import HeroSection from '@/components/sections/HeroSection';
import NosotrosSection from '@/components/sections/NosotrosSection';
import FranjaPromo from '@/components/sections/FranjaPromo';
import MenuSection from '@/components/sections/MenuSection';
import ExperienciaReelsInstagram from '@/components/sections/ExperienciaReelsInstagram';

export default function FoodtruckPage() {
    const router = useRouter();
    const [config, setConfig] = useState(null);
    const [cart, setCart] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;
        const { foodtruckId } = router.query;
        const id = Array.isArray(foodtruckId) ? foodtruckId[0] : foodtruckId;
        const found = foodtrucks[id];
        if (found) setConfig(found);
    }, [router.isReady, router.query]);

    const addToCart = (name, size, flavor = null, price) => {
        setCart([...cart, { name, size, flavor, price }]);
    };

    const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
    };

    const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

    if (!config) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center">
                <p className="text-gray-500">Cargando foodtruck...</p>
            </div>
        );
    }

    const seccionesDisponibles = {
        nosotros: <NosotrosSection nosotros={config.nosotros} />,
        hero: <HeroSection hero={config.hero} />,
        franjaPromo: <FranjaPromo promo={config.promo} />,
        menu: (
            <MenuSection
                menu={config.menu}
                addToCart={addToCart}
                ProductCard={ProductCard}
            />
        ),
        experienciaInstagram: (
            <ExperienciaReelsInstagram data={config.experienciaInstagram} />
        ),
        footer: <Footer config={config} />
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">

            <Header config={config} />

            {/* Renderizar secciones configuradas */}
            {config.secciones?.map((seccion) => (
                <div key={seccion}>{seccionesDisponibles[seccion] || null}</div>
            ))}

            {/* Carrito flotante */}
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

            {/* Formulario de Checkout */}
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
                            <CheckoutForm
                                cart={cart}
                                config={config}
                                foodtruckId={config.id}
                                onCancel={() => setShowForm(false)}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
