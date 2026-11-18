import { http, HttpResponse, delay } from 'msw';
import { graphql } from 'msw';

const destinations = [
  { id: '1', name: 'París', country: 'Francia', popularActivity: 'Visitar la Torre Eiffel y museos' },
  { id: '2', name: 'Tokio', country: 'Japón', popularActivity: 'Explorar templos y gastronomía local' },
  { id: '3', name: 'Cancún', country: 'México', popularActivity: 'Disfrutar playas y ruinas mayas' }
];

const travelDetails = {
  '1': {
    flights: [
      { id: 'f1', airline: 'Air France', price: 750000, date: '2026-06-10' },
      { id: 'f2', airline: 'Iberia', price: 680000, date: '2026-06-12' }
    ],
    hotels: [
      { id: 'h1', name: 'Hotel Eiffel Luxury', price: 120000, availableRooms: 5 },
      { id: 'h2', name: 'Parisian Inn', price: 85000, availableRooms: 8 }
    ]
  },
  '2': {
    flights: [
      { id: 'f3', airline: 'Japan Airlines', price: 1100000, date: '2026-09-01' },
      { id: 'f4', airline: 'American Airlines', price: 950000, date: '2026-09-03' }
    ],
    hotels: [
      { id: 'h3', name: 'Tokio Grand Hotel', price: 150000, availableRooms: 3 },
      { id: 'h4', name: 'Shinjuku Capsule & Spa', price: 50000, availableRooms: 12 }
    ]
  },
  '3': {
    flights: [
      { id: 'f5', airline: 'LATAM', price: 350000, date: '2026-07-15' },
      { id: 'f6', airline: 'Copa Airlines', price: 320000, date: '2026-07-16' }
    ],
    hotels: [
      { id: 'h5', name: 'Cancun Beach Resort', price: 90000, availableRooms: 10 },
      { id: 'h6', name: 'Caribe Sun Hotel', price: 60000, availableRooms: 15 }
    ]
  }
};

export const handlers = [
  http.get('/api/destinations', async () => {
    await delay(800);
    return HttpResponse.json(destinations);
  }),

  graphql.query('GetTravelDetails', async ({ variables }) => {
    await delay(800);
    const { destinationId } = variables;
    const details = travelDetails[destinationId] || { flights: [], hotels: [] };
    
    return HttpResponse.json({
      data: {
        destinationInfo: details
      }
    });
  })
];