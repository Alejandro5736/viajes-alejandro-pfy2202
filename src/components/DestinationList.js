import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DestinationList() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/destinations')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar los destinos');
        return res.json();
      })
      .then(data => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Cargando destinos turísticos (REST)... ✈️</div>;
  if (error) return <div className="error-msg">Error: {error}</div>;

  return (
    <div className="destination-container">
      <h2>Destinos Disponibles (Vía REST)</h2>
      <p>Selecciona un destino para consultar sus vuelos y hoteles:</p>
      
      <div className="destinations-grid">
        {destinations.map(dest => (
          <div key={dest.id} className="destination-card">
            <h3>{dest.name} ({dest.country})</h3>
            <p><strong>Actividad popular:</strong> {dest.popularActivity}</p>
            <Link to={`/destination/${dest.id}?name=${encodeURIComponent(dest.name)}`} className="detail-btn">
              Ver Vuelos y Hoteles 🏨✈️
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}