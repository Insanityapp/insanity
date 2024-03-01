import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    // Fazendo a solicitação GET para o servidor
    fetch("http://localhost:5000/itens")
      .then((response) => response.json())
      .then((data) => setItens(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []); // O array vazio assegura que a solicitação seja feita apenas uma vez após a montagem do componente

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Dados do Servidor:</p>
        <ul>
          {itens.map((item) => (
            <li key={item._id}>{item.nome}</li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
