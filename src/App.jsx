import React, { useState } from "react";
import "./App.css";

// Rutas actualizadas según tu estructura
import Home from "./componentes/Home/Home.jsx";
import Detalles from "./componentes/Detalles/Detalles.jsx";
import Favoritos from "./componentes/Favoritos/Favoritos.jsx";
import Original from "./componentes/Original/Original.jsx";
import Informativa from "./componentes/Informativa/Informativa.jsx";
import BottomBar from "./componentes/BottomBar/BottomBar.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "detalles":
        return <Detalles />;
      case "favoritos":
        return <Favoritos />;
      case "original":
        return <Original />;
      case "informativa":
        return <Informativa />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      <main>{renderTab()}</main>
      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;

// Instalaciones hechas
// Instala Framer Motion y Lucide React para las animaciones e íconos:
// npm install framer-motion lucide-react

// Instalación de Tailwind CSS para estilos:
// npm install -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p
