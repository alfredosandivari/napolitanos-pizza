import { foodtrucks } from '@/platix.config';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { cart, customer, foodtruck_id } = req.body;

  if (!cart || cart.length === 0 || !customer || !foodtruck_id) {
    return res.status(400).json({ message: 'Faltan datos del pedido o foodtruck_id' });
  }

  const config = foodtrucks[foodtruck_id];

  if (!config) {
    return res.status(400).json({ message: 'Foodtruck no encontrado' });
  }

  const items = cart.map((item) => ({
    title: `${item.name} ${item.size}${item.flavor ? ' - ' + item.flavor : ''}`,
    quantity: 1,
    unit_price: Number(item.price) || 0,
    currency_id: 'CLP',
  }));

  const preference = {
    items,
    payer: {
      name: customer.name,
      email: customer.email || config.email,
    },
    back_urls: {
      success: `https://napolitanos-pizza.vercel.app/g/${foodtruck_id}/success`,
      failure: `https://napolitanos-pizza.vercel.app/g/${foodtruck_id}/failure`,
      pending: `https://napolitanos-pizza.vercel.app/g/${foodtruck_id}/pending`,
    },    
    auto_return: 'approved',
    metadata: {
      customer,
      cart,
      foodtruck_id: config.id,
    },
    notification_url: `https://napolitanos-pizza.vercel.app/api/webhook`,
  };

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ init_point: data.init_point });
    } else {
      console.error('Error al crear preferencia MP:', data);
      return res.status(500).json({ message: 'Error al crear preferencia de pago' });
    }
  } catch (error) {
    console.error('Error interno:', error);
    return res.status(500).json({ message: 'Error interno al generar preferencia' });
  }
}
