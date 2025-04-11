import { resend } from '@/lib/resend';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método no permitido' });
    }
  
    const { customer, cart } = req.body;
  
    if (!customer || !cart || cart.length === 0) {
      return res.status(400).json({ message: 'Faltan datos del pedido' });
    }
  
    const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);
  
    const detalle = cart.map((item, index) => {
        return `${index + 1}. ${item.name} (${item.size}${item.flavor ? `, ${item.flavor}` : ''}) - $${item.price.toLocaleString('es-CL')}`;
    }).join(' • ');
      
  
    const entregaTexto =
      customer.deliveryOption === 'programado' && customer.schedule
        ? `Programado para las ${customer.schedule}`
        : 'Retiro inmediato en el local';

    const totalTexto = `CLP ${total.toLocaleString('es-CL')}`;

  
    if (
      !customer.name ||
      !customer.phone ||
      !Array.isArray(cart) ||
      cart.length === 0 ||
      (customer.deliveryOption === 'programado' && !customer.schedule)
    ) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
  
    const payload = {
      messaging_product: 'whatsapp',
      to: customer.foodtruckNumber,
      type: 'template',
      template: {
        name: 'pedido_confirmado_2025',
        language: { code: 'es_CL' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: customer.name },
              { type: 'text', text: detalle },
              { type: 'text', text: entregaTexto },
              { type: 'text', text: `CLP ${total.toLocaleString('es-CL')}` },
            ]
          }
        ]
      },
    };
  
    console.log('🚀 Payload final que se envía a Meta:', JSON.stringify(payload, null, 2));
  
    try {
      const response = await fetch(`https://graph.facebook.com/v19.0/${process.env.WA_PHONE_ID}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.WA_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();

      console.log('📦 RESPUESTA DE META:', JSON.stringify(data, null, 2));

      // ✅ 1. Correo al administrador
      await resend.emails.send({
        from: 'Pedidos Pizza <contacto@napolitanospizza.cl>',
        to: ['ignacio.rivera.rojo@gmail.com'],
        cc: ['alfredo@sodired.cl'],
        subject: 'Nuevo Pedido Web 🍕',
        html: `
          <h2>Nuevo pedido desde la web 🍕</h2>
          <p><strong>Nombre:</strong> ${customer.name}</p>
          <p><strong>Teléfono:</strong> ${customer.phone}</p>
          <p><strong>Entrega:</strong> ${entregaTexto}</p>
          <p><strong>Total:</strong> ${totalTexto}</p>
          <pre style="background:#f3f3f3;padding:10px;border-radius:5px;">
      ${detalle}
          </pre>
        `
      });

      // ✅ 2. Correo al cliente (solo si dejó su email)
      if (customer.email) {
        await resend.emails.send({
          from: 'Napolitanos Pizza 🍕 <contacto@napolitanospizza.cl>',
          to: [customer.email],
          subject: '¡Gracias por tu pedido, ' + customer.name + '!',
          html: `
            <div style="font-family: sans-serif; text-align: center; padding: 20px; background-color: #1e1e1e; color: #f3f3f3; border-radius: 10px;">
            <img src="https://napolitanos-pizza.vercel.app/pizzas/logo.png" alt="Napolitanos" style="max-width: 180px; margin-bottom: 20px;" />
            <h1 style="color: #fbbf24;">¡Gracias por tu pedido, ${customer.name}!</h1>
            <p>Estamos preparando tu pizza con mucho cariño y queso derretido 🧀🔥</p>
            <p><strong>Entrega:</strong> ${entregaTexto}</p>
            <h2 style="margin-top: 30px;">🧾 Detalle:</h2>
            <ul style="text-align: left; display: inline-block; padding: 0; list-style: none;">
              ${cart.map((item, i) => `
                <li>🍕 ${item.name} (${item.size}${item.flavor ? `, ${item.flavor}` : ''}) - $${item.price.toLocaleString('es-CL')}</li>
              `).join('')}
            </ul>
            <p style="margin-top: 15px; font-size: 18px;"><strong>Total:</strong> ${totalTexto}</p>
            <p style="margin-top: 30px;">Nos vemos pronto en <strong style="color: #f87171;">Napolitanos Pizza</strong> 🍕</p>
            <hr style="margin-top: 40px; border-color: #555;" />
            <p style="font-size: 12px; color: #aaa;">Este es un correo automático, no lo respondas.</p>
          </div>
        `
        });
      }
      
      console.log('📨 RESPUESTA DE RESEND:', emailResponse);

      if (response.ok) {
          return res.status(200).json({ success: true, data });
      } else {
          console.error('❌ Error WhatsApp API:', JSON.stringify(data, null, 2));
          return res.status(500).json({ success: false, error: data });
      }
    } catch (error) {
      console.error('🔥 Error catch:', error);
      return res.status(500).json({ success: false, error: 'Error de servidor' });
    }
  }
  