// pages/api/create-preference.js
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { cart, customer } = req.body;

  if (!cart || cart.length === 0 || !customer) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  // Armar descripción del pedido
  const orderDescription = cart
    .map((item, i) => `${i + 1}. ${item.name} (${item.size}${item.flavor ? `, ${item.flavor}` : ''}) - $${item.price.toLocaleString('es-CL')}`)
    .join(' | ');

  const totalAmount = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  try {
    const preference = {
      items: [
        {
          title: 'Pedido Foodtruck',
          description: orderDescription,
          quantity: 1,
          unit_price: totalAmount,
          currency_id: 'CLP',
        },
      ],
      payer: {
        name: customer.name,
        email: customer.email || 'sincorreo@cliente.cl',
      },
      metadata: {
        phone: customer.phone,
        deliveryType: customer.deliveryType,
        pickupTime: customer.pickupTime || '',
        cart,
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL}/failure`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL}/pending`,
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);

    return res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    return res.status(500).json({ message: 'Error interno al crear preferencia' });
  }
}
