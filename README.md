# Agencia de Viajes - Integración Frontend con Backend (REST & GraphQL)

Proyecto desarrollado para la **Evaluación Sumativa - Semana 5** de la asignatura **Desarrollo Frontend II (PFY2202)**. La aplicación implementa una plataforma web de consulta turística en React que integra de forma simultánea el consumo de una **API REST** (para el listado de destinos) y una **API GraphQL** (para consultar vuelos y hoteles disponibles por destino) mediante **Mock Service Worker (MSW)** y **Apollo Client**.

---

## Tecnologías Utilizadas

* **React (v19):** Biblioteca principal para la construcción de la interfaz de usuario basada en componentes funcionales.
* **React Router DOM:** Gestión de rutas dinámicas (`/`, `/destination/:id`) para una navegación fluida tipo SPA (Single Page Application).
* **Apollo Client (`@apollo/client`):** Cliente GraphQL utilizado para ejecutar consultas estructuradas y gestionar la caché de datos.
* **GraphQL:** Lenguaje de consulta para obtener de manera granular vuelos y alojamientos filtrados por destino.
* **Mock Service Worker (MSW v2):** Interceptación de peticiones HTTP a nivel de red en el navegador para simular el servidor backend tanto REST como GraphQL.

---

## Estructura del Proyecto

```text
viajes-alejandro-pfy2202/
├── public/
│   ├── index.html
│   └── mockServiceWorker.js       # Service Worker generado por MSW
├── src/
│   ├── components/
│   │   ├── DestinationList.js     # Vista principal: consume destinos vía API REST
│   │   └── TravelDetail.js        # Vista de detalle: consulta vuelos y hoteles vía GraphQL
│   ├── mocks/
│   │   ├── browser.js             # Configuración del worker de MSW para el navegador
│   │   └── handlers.js            # Controladores mock para endpoints REST y GraphQL
│   ├── App.css                    # Estilos responsivos de la plataforma
│   ├── App.js                     # Configuración de rutas con React Router
│   └── index.js                   # Configuración de ApolloProvider e inicio de MSW
├── package.json
└── README.md