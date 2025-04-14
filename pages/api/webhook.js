import { resend } from '@/lib/resend';
import { foodtrucks } from '@/platix.config';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const { id, topic } = req.query;

    if (topic !== 'payment') {
      return res.status(200).json({ message: 'Evento ignorado' });
    }

    const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    });

    const payment = await paymentRes.json();

    if (!paymentRes.ok || !payment.status) {
      console.error('❌ Error al obtener pago:', payment);
      return res.status(500).json({ message: 'Error al verificar el pago' });
    }

    if (payment.status !== 'approved') {
      return res.status(200).json({ message: `Pago no aprobado (${payment.status})` });
    }

    const { customer, cart, foodtruck_id } = payment.metadata || {};
    const config = foodtrucks[foodtruck_id];

    if (!customer || !cart || !Array.isArray(cart) || !config) {
      return res.status(400).json({ message: 'Faltan datos en metadata o configuración no encontrada' });
    }

    const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    const detalle = cart.map((item, index) => {
      return `${index + 1}. ${item.quantity}x ${item.name} (${item.size || ''}${item.flavor ? `, ${item.flavor}` : ''}) - $${(item.price * (item.quantity || 1)).toLocaleString('es-CL')}`;
    }).join(' • ');

    const entregaTexto =
      customer.deliveryOption === 'programado' && customer.schedule
        ? `Programado para las ${customer.schedule}`
        : 'Retiro inmediato en el local';

    const totalTexto = `CLP ${total.toLocaleString('es-CL')}`;

    // WHATSAPP
    const payload = {
      messaging_product: 'whatsapp',
      to: config.telefono,
      type: 'template',
      template: {
        name: config.template,
        language: { code: 'es_CL' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: customer.name },
              { type: 'text', text: detalle },
              { type: 'text', text: entregaTexto },
              { type: 'text', text: totalTexto },
            ],
          },
        ],
      },
    };

    const whatsappRes = await fetch(`https://graph.facebook.com/v19.0/${process.env.WA_PHONE_ID}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // CORREO ADMIN
    await resend.emails.send({
      from: `Pedidos ${config.nombre} <${config.email}>`,
      to: [config.email],
      cc: ['alfredo@sodired.cl'],
      subject: `Nuevo pedido en ${config.nombre} 🍕`,
      html:  `
        <h2>Nuevo pedido recibido en ${config.nombre}</h2>
        <p><strong>Nombre:</strong> ${customer.name}</p>
        <p><strong>Teléfono:</strong> ${customer.phone}</p>
        <p><strong>Entrega:</strong> ${entregaTexto}</p>
        <p><strong>Total:</strong> ${totalTexto}</p>
        <pre style="background:#f3f3f3;padding:10px;border-radius:5px;">${detalle}</pre>
      `,
    });

    // CORREO CLIENTE
    if (customer.email) {
      await resend.emails.send({
        from: `Pedidos ${config.nombre} <${config.email}>`,
        to: [customer.email],
        cc: ['alfredo@sodired.cl'],
        subject: `¡Gracias por tu pedido en ${config.nombre}!`,
        html: `
          <div style="font-family: sans-serif; text-align: center; padding: 20px; background-color: #1e1e1e; color: #f3f3f3; border-radius: 10px;">
            <img src="${config.logo}" alt="${config.nombre}" style="max-width: 180px; margin-bottom: 20px;" />
            <h1 style="color: ${config.color};">¡Gracias por tu pedido, ${customer.name}!</h1>
            <p>Estamos preparando todo con cariño y sabor auténtico 🔥</p>
            <p><strong>Entrega:</strong> ${entregaTexto}</p>
            <h2 style="margin-top: 30px;">🧾 Detalle:</h2>
            <ul style="text-align: left; display: inline-block; padding: 0; list-style: none;">
              ${cart.map((item, i) => `
              <li>🍴 ${item.quantity || 1}x ${item.name} (${item.size || ''}${item.flavor ? `, ${item.flavor}` : ''}) - $${(item.price * (item.quantity || 1)).toLocaleString('es-CL')}</li>
              `).join('')}
            </ul>
            <p style="margin-top: 15px; font-size: 18px;"><strong>Total:</strong> ${totalTexto}</p>
            <p style="margin-top: 30px;">Nos vemos pronto en <strong style="color: ${config.color};">${config.nombre}</strong></p>
            <hr style="margin-top: 40px; border-color: #555;" />
            <p style="font-size: 12px; color: #aaa;">Este es un correo automático. No lo respondas.</p>
          </div>
        `,
      });
    }

    return res.status(200).json({ message: 'Pedido procesado desde webhook' });

  } catch (err) {
    console.error('🔥 Error en webhook:', err);
    return res.status(500).json({ message: 'Error interno en webhook' });
  }
}
