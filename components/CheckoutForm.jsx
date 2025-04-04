import { useState } from 'react';

const CheckoutForm = ({ cart, onCancel }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState('inmediato');
  const [pickupTime, setPickupTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!name || !phone) {
      alert('Por favor completa tu nombre y número de WhatsApp');
      return;
    }
  
    setLoading(true);
  
    try {
      const res = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: name,
            phone: phone,
            address: 'Avenida Rica Aventura #11780',
            deliveryOption: deliveryType,
            schedule: pickupTime,
            foodtruckNumber: '56963424158'
          },
          cart,
        }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        // Guardar en localStorage y redirigir
        localStorage.setItem('lastOrder', JSON.stringify(cart));
        window.location.href = '/success';
      } else {
        console.error('Error backend:', data.error);
        alert('No se pudo enviar el pedido. Intenta nuevamente.');
        setLoading(false);
      }
  
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      alert('Error interno al enviar pedido');
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
        <label className="block text-sm font-medium mb-1">WhatsApp</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Ej: +56912345678"
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
