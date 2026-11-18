import React from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_TRAVEL_DETAILS = gql`
  query GetTravelDetails($destinationId: ID!) {
    destinationInfo(destinationId: $destinationId) {
      flights {
        id
        airline
        price
        date
      }
      hotels {
        id
        name
        price
        availableRooms
      }
    }
  }
`;

export default function TravelDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const destinationName = searchParams.get('name') || 'Destino';

  const { loading, error, data } = useQuery(GET_TRAVEL_DETAILS, {
    variables: { destinationId: id }
  });

  if (loading) return <div className="loader">Consultando vuelos y hoteles (GraphQL)... ⏳</div>;
  
  if (error) {
    return (
      <div className="travel-detail-container">
        <h2>Opciones de Viaje para: {destinationName}</h2>
        <Link to="/" className="back-link">← Volver a destinos</Link>
        <div className="error-msg">Error GraphQL: {error?.message || 'Error desconocido'}</div>
      </div>
    );
  }

  const flights = data?.destinationInfo?.flights || [];
  const hotels = data?.destinationInfo?.hotels || [];

  return (
    <div className="travel-detail-container">
      <h2>Opciones de Viaje para: {destinationName}</h2>
      <Link to="/" className="back-link">← Volver a destinos</Link>

      <div className="sections-grid">
        <section className="travel-section">
          <h3>🛫 Vuelos Disponibles</h3>
          {flights.length === 0 ? (
            <p>No hay vuelos disponibles para este destino.</p>
          ) : (
            flights.map(flight => (
              <div key={flight.id} className="item-card">
                <p><strong>Aerolínea:</strong> {flight.airline}</p>
                <p><strong>Fecha:</strong> {flight.date}</p>
                <p className="price">Precio: ${flight.price}</p>
              </div>
            ))
          )}
        </section>

        <section className="travel-section">
          <h3>🏨 Hoteles Disponibles</h3>
          {hotels.length === 0 ? (
            <p>No hay hoteles disponibles para este destino.</p>
          ) : (
            hotels.map(hotel => (
              <div key={hotel.id} className="item-card">
                <p><strong>Hotel:</strong> {hotel.name}</p>
                <p><strong>Habitaciones libres:</strong> {hotel.availableRooms}</p>
                <p className="price">Precio por noche: ${hotel.price}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}