import React, { useState, useEffect } from "react";
import { Search, Rocket } from "lucide-react";
import "./Busqueda.css"; // Importamos el CSS externo

export default function Busqueda() {
  const [rockets, setRockets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRockets = async () => {
      try {
        const response = await fetch("https://api.spacexdata.com/v4/rockets");
        const data = await response.json();
        setRockets(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error al obtener cohetes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRockets();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setFiltered(
      rockets.filter((rocket) =>
        rocket.name.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="busqueda-container">
      <div className="busqueda-header">
        <Rocket size={40} className="busqueda-icon" />
        <h1>Buscador de Cohetes SpaceX</h1>
      </div>

      <p className="busqueda-subtitle">
        Busca información sobre los cohetes más poderosos de SpaceX 🚀
      </p>

      <div className="busqueda-input-container">
        <Search className="busqueda-search-icon" />
        <input
          type="text"
          placeholder="Buscar cohete..."
          value={query}
          onChange={handleSearch}
          className="busqueda-input"
        />
      </div>

      {loading ? (
        <p className="busqueda-loading">Cargando cohetes...</p>
      ) : filtered.length > 0 ? (
        <div className="busqueda-grid">
          {filtered.map((rocket) => (
            <div key={rocket.id} className="busqueda-card">
              <img
                src={rocket.flickr_images[0]}
                alt={rocket.name}
                className="busqueda-img"
              />
              <div className="busqueda-card-body">
                <h2 className="busqueda-card-title">{rocket.name}</h2>
                <p className="busqueda-card-desc">{rocket.description}</p>
                <div className="busqueda-card-info">
                  <p>
                    <strong>Primer vuelo:</strong> {rocket.first_flight}
                  </p>
                  <p>
                    <strong>País:</strong> {rocket.country}
                  </p>
                  <p>
                    <strong>Activo:</strong> {rocket.active ? "✅ Sí" : "❌ No"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="busqueda-noresult">No se encontraron cohetes.</p>
      )}
    </div>
  );
}
