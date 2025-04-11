import { useState } from 'react';

const CheckoutForm = ({ cart, onCancel }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryType, setDeliveryType] = useState('inmediato');
  const [pickupTime, setPickupTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!name || !phone || !email) {
      alert('Por favor completa todos los campos: nombre, WhatsApp y correo electrónico');
      return;
    }    
  
    setLoading(true);
  
    try {
      const orderInfo = {
        customer: {
          name,
          phone,
          email,
          address: 'Avenida Rica Aventura #11780',
          deliveryOption: deliveryType,
          schedule: pickupTime,
          foodtruckNumber: '56963424158',
        },
        cart,
      };
  
      localStorage.setItem('pendingOrder', JSON.stringify(orderInfo));
  
      // ✅ Aquí va completo el cuerpo con customer + cart
      const prefRes = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderInfo), // antes solo mandabas { cart }
      });
  
      const prefData = await prefRes.json();
  
      if (!prefData.init_point) {
        alert('Error al iniciar el pago. Intenta más tarde.');
        setLoading(false);
        return;
      }
  
      window.location.href = prefData.init_point;
  
    } catch (error) {
      console.error('Error al procesar pago:', error);
      alert('Error interno al procesar pago');
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold text-center mb-6">📝 Datos para tu pedido</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Ej: Juan Pérez"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">WhatsApp / Cel</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Ej: +56912345678"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Ej: nombre@correo.com"
          required
        />
      </div>


      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">¿Cómo quieres retirar tu pedido?</label>
        <select
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="inmediato">Inmediato</option>
          <option value="programado">Programar hora</option>
        </select>
      </div>

      {deliveryType === 'programado' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">¿A qué hora?</label>
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <button
          onClick={onCancel}
          className="w-full md:w-1/2 py-3 rounded border text-gray-700 hover:bg-gray-100 transition"
        >
          Volver
        </button>
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full md:w-1/2 py-3 rounded text-white font-bold transition ${
            loading ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {loading ? 'Redirigiendo...' : 'Pagar ahora'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
