import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DestinationList from './components/DestinationList';
import TravelDetail from './components/TravelDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="app-header">
          <h1>🌍 Agencia de Viajes - Duoc UC</h1>
          <nav>
            <Link to="/" className="nav-link">Inicio</Link>
          </nav>
        </header>

        <main className="app-content">
          <Routes>
            <Route path="/" element={<DestinationList />} />
            <Route path="/destination/:id" element={<TravelDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;