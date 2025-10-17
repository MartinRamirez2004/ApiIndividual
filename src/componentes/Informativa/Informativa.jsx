import React, { useEffect, useState } from "react";
import "./Informativa.css";

export default function Informativa() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch("https://api.spacexdata.com/v4/company");
        const data = await response.json();
        setInfo(data);
      } catch (error) {
        console.error("Error al obtener información de la API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  return (
    <div className="infoapi-container">
      <h1 className="infoapi-title">Información General</h1>

      {loading ? (
        <p>Cargando información...</p>
      ) : (
        info && (
          <div className="infoapi-card">
            <h2>{info.name}</h2>
            <p><strong>Fundador:</strong> {info.founder}</p>
            <p><strong>Año de fundación:</strong> {info.founded}</p>
            <p><strong>Empleados:</strong> {info.employees}</p>
            <p><strong>Ubicación:</strong> {info.headquarters.city}, {info.headquarters.state}</p>
            <p><strong>Resumen:</strong> {info.summary}</p>
          </div>
        )
      )}
        <p>Creado por <strong>Martin Fernando Ramirez Ramirez</strong></p>
        <p>2025</p>
    </div>
  );
}
