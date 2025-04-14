export const foodtrucks = {
    napolitanos: {
        id: 'napolitanos',
        nombre: 'Napolitanos Pizza',
        dominio: 'napolitanospizza.cl',
        telefono: '56977036826',
        email: 'ignacio.rivera.rojo@gmail.com',
        logo: '/logos/napolitanos.png',
        color: '#e30910',
        template: 'pedido_confirmado_2025',
        secciones: [
            'hero',
            'nosotros',
            'franjaPromo',
            'menu',
            'experienciaInstagram',
            'footer'
        ],
        hero: {
            titulo: '¡Bienvenido a Napolitanos!',
            descripcion: 'Prueba nuestras pizzas artesanales hechas con pasión en Patio Rica Aventura.',
            fondo: '/pizzas/fondo-pizza.jpg'
        },
        nosotros: {
            titulo: '🎉 ¡Vive la experiencia del Foodtruck!',
            imagen: '/pizzas/foodtruck.jpg',
            parrafos: [
                'Somos un foodtruck ubicado en <strong>Patio Rica Aventura </strong>, un espacio gastronómico único donde puedes disfrutar nuestras pizzas artesanales al aire libre.',
                'Los <strong>fines de semana</strong> encendemos el ambiente con <strong>karaoke y música en vivo</strong>, ideal para venir con amigos o en familia. Acompaña tus pizzas favoritas con nuestras bebidas bien heladas y pasa una velada inolvidable.',
                '¡Te esperamos para disfrutar de buena comida, música y diversión!'
            ]
        },
        promo: {
            texto: '🎉 ¡Ven a disfrutar de la mejor pizza, música y ambiente en Patio Rica Aventura! 🍕🎶',
            color: '#e30910'
        },
        experienciaInstagram: {
            titulo: '🎥 Vive la experiencia en Patio Rica Aventura',
            parrafo: {
                titulo: 'Música en vivo, karaoke y las mejores pizzas al aire libre.',
                descripcion: 'Cada fin de semana creamos un ambiente único donde el sabor, la música y la buena compañía se encuentran. Disfruta nuestras pizzas artesanales acompañadas de bebidas heladas y mucha buena onda 🎶🍕',
                fraseFinal: '¡Una experiencia que va más allá del sabor!'
            },
            reel: 'https://www.instagram.com/reel/DHEkWysJvEX/embed'
        },
        menu: [
            {
                id: 'margarita',
                name: 'Margarita',
                desc: 'Pizza con base de salsa pomodoro, mozzarella, albahaca fresca y un toque de aceite de oliva.',
                image: '/pizzas/margarita.jpg',
                variants: [
                    { size: 'Personal', price: 500 },
                    { size: 'Compartida', price: 8500 }
                ]
            },
            {
                id: 'pepperoni',
                name: 'Pepperoni',
                desc: 'Pizza con base de salsa pomodoro, mozzarella y pepperoni.',
                image: '/pizzas/pepperoni.jpg',
                variants: [
                    { size: 'Personal', price: 9500 },
                    { size: 'Compartida', price: 14000 }
                ]
            },
            {
                id: 'napolitana',
                name: 'Napolitana',
                desc: 'Pizza con base de salsa pomodoro, mozzarella, jamón artesanal, tomate y un toque de orégano.',
                image: '/pizzas/napolitana.jpg',
                variants: [
                    { size: 'Personal', price: 10000 },
                    { size: 'Compartida', price: 15000 }
                ]
            },
            {
                id: 'del-huerto',
                name: 'Del Huerto',
                desc: 'Pizza con base de salsa pomodoro, mozzarella, champiñon, tomate cherry, mix de pimentones y albahaca fresca.',
                image: '/pizzas/napolitana.jpg',
                variants: [
                    { size: 'Personal', price: 6000 },
                    { size: 'Compartida', price: 10500 }
                ]
            },
            {
                id: 'hawaiana',
                name: 'Hawaiana',
                desc: 'Pizza con base de salsa mozzarella, jamón artesanal y piña.',
                image: '/pizzas/napolitana.jpg',
                variants: [
                    { size: 'Personal', price: 6000 },
                    { size: 'Compartida', price: 10500 }
                ]
            },
            {
                id: 'mediterranea',
                name: 'Mediterranea',
                desc: 'Pizza con base de salsa pomodoro, mozzarella, cebolla morada, pimentón, tomate, aceitunas negras y un toque de orégano.',
                image: '/pizzas/napolitana.jpg',
                variants: [
                    { size: 'Personal', price: 6500 },
                    { size: 'Compartida', price: 11500 }
                ]
            },
            {
                id: 'campestre',
                name: 'Campestre',
                desc: 'Pizza con base de salsa pomodoro, mozzarella, champiñones, tomate cherry y chorizo artesanal.',
                image: '/pizzas/napolitana.jpg',
                variants: [
                    { size: 'Personal', price: 6500 },
                    { size: 'Compartida', price: 11500 }
                ]
            },
            {
                id: 'espanola',
                name: 'Española',
                desc: 'Pizza con base de salsa pomodoro, mozzarella, chorizo artesanal, pimentón, cebolla morada y tomate.',
                image: '/pizzas/napolitana.jpg',
                variants: [
                    { size: 'Personal', price: 7000 },
                    { size: 'Compartida', price: 12500 }
                ]
            },
            {
                id: 'serrano',
                name: 'Serrano',
                desc: 'Pizza con base de salsa pomodoro, mozzarella, jamón serrano y tomate cherry.',
                image: '/pizzas/napolitana.jpg',
                variants: [
                    { size: 'Personal', price: 7000 },
                    { size: 'Compartida', price: 12500 }
                ]
            },
            {
                id: 'mix-carnes',
                name: 'Mix de carnes',
                desc: 'Pizza con base de salsa pomodoro, mozzarella, salame, chorizo y jamón artesanal.',
                image: '/pizzas/napolitana.jpg',
                variants: [
                    { size: 'Personal', price: 7000 },
                    { size: 'Compartida', price: 12500 }
                ]
            },
            {
                id: 'diavola',
                name: 'Diavola',
                desc: 'Pizza con base de salsa pomodoro, mozzarella, mitad salame y mitad pepperoni con jamón artesanal, tomate y aceitunas negras.',
                image: '/pizzas/napolitana.jpg',
                variants: [
                    { size: 'Personal', price: 7000 },
                    { size: 'Compartida', price: 12500 }
                ]
            },
            {
                id: 'bebida_15l',
                name: 'Bebida 1.5L',
                desc: 'Botella de bebida fría 1.5L para compartir.',
                image: '/pizzas/bebidas1medio.png',
                variants: [
                    { flavor: 'Coca-Cola', price: 2800 },
                    { flavor: 'Fanta', price: 2800 },
                    { flavor: 'Sprite', price: 2800 },
                    { flavor: 'Pepsi', price: 2800 },
                    { flavor: 'Pepsi Zero', price: 2800 },
                    { flavor: 'Limon Soda', price: 2800 }
                ]
            },
            {
                id: 'bebida_lata',
                name: 'Bebida Lata',
                desc: 'Bebida individual en formato lata, bien helada.',
                image: '/pizzas/bebidaslata.jpg',
                variants: [
                    { flavor: 'Coca-Cola', price: 1500 },
                    { flavor: 'Fanta', price: 1500 },
                    { flavor: 'Sprite', price: 1500 },
                    { flavor: 'Pepsi', price: 1500 },
                    { flavor: 'Pepsi Zero', price: 1500 },
                    { flavor: 'Limon Soda', price: 1500 }
                ]
            }
        ],
        footer: {
            fondo: '#1f2937',
            descripcion: 'El sabor que recorre las calles. Pizzas artesanales, buena música y un ambiente inolvidable en Patio Rica Aventura.',
            direccion: 'Avenida Rica Aventura #11780, Antofagasta',
            horario: {
                dias: 'Lunes a Domingo',
                horas: '18:00 - 23:30 hrs'
            },
            instagram: [
                'https://www.instagram.com/napolitanospizza.cl/',
                'https://www.instagram.com/patioricaaventura/'
            ],
            whatsapp: '56944845291',
            mapaEmbedUrl: 'https://www.google.com/maps?q=Avenida+Rica+Aventura+11780,+Antofagasta&output=embed'
        }
    },
    sandwichgeorge: {
        id: 'sandwichgeorge',
        nombre: 'Sandwich George',
        dominio: 'sandwichgeorge.cl',
        telefono: '56987654321',
        email: 'sandwichgeorge@completos.cl',
        logo: '/logos/george.png',
        color: '#f59e0b',
        template: 'pedido_confirmado_george',
        menu: [
            {
                id: 'completo_italiano',
                name: 'Completo Italiano',
                price: 3000,
                desc: 'Pan de hot dog, vienesa, tomate, palta y mayo casera.',
                image: '/completos/italiano.jpg',
                // No tiene opciones
            },
            {
                id: 'completo_dinamico',
                name: 'Completo Dinámico',
                price: 3200,
                desc: 'Con tomate, chucrut, mayo y tu salsa favorita.',
                image: '/completos/dinamico.jpg',
            },
            {
                id: 'churrasco_queso',
                name: 'Churrasco Queso',
                price: 3500,
                desc: 'Pan frica con churrasco de vacuno y queso fundido.',
                image: '/completos/churrasco.jpg',
            },
            {
                id: 'chacarero',
                name: 'Chacarero',
                price: 4200,
                desc: 'Churrasco, porotos verdes, ají verde y tomate. ¡Un clásico chileno!',
                image: '/completos/chacarero.jpg',
                options: {
                    size: ['Simple', 'Doble'] // opcional si quieres versiones grandes
                }
            },
            {
                id: 'bebida_lata',
                name: 'Bebida Lata',
                price: 1500,
                desc: 'Bebida en lata bien helada.',
                image: '/pizzas/bebida.jpg',
                size: 'Lata',
                options: {
                    flavor: ['Coca-Cola', 'Fanta', 'Sprite', 'Pepsi', 'Pepsi Zero', 'Limon Soda']
                }
            }
        ]
    }

};
