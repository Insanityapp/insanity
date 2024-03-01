import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [itens, setItens] = useState([]);
  const [novoItem, setNovoItem] = useState("");

  useEffect(() => {
    // Fazendo a solicitação GET para o servidor
    fetch("https://insanity-app.vercel.app/itens")
      .then((response) => response.json())
      .then((data) => setItens(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []); // O array vazio assegura que a solicitação seja feita apenas uma vez após a montagem do componente

  const adicionarItem = async () => {
    try {
      const response = await fetch(
        "https://insanity-app.vercel.app/adicionarItem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome: novoItem }),
        }
      );

      if (response.ok) {
        console.log("Item adicionado com sucesso!");
        // Atualiza a lista de itens após adicionar um novo
        fetch("https://insanity-app.vercel.app/itens")
          .then((response) => response.json())
          .then((data) => setItens(data))
          .catch((error) => console.error("Erro ao buscar dados:", error));
      } else {
        console.error("Erro ao adicionar item:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

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
        <div>
          <input
            type="text"
            placeholder="Novo Item"
            value={novoItem}
            onChange={(e) => setNovoItem(e.target.value)}
          />
          <button onClick={adicionarItem}>Adicionar</button>
        </div>
      </header>
    </div>
  );
}

export default App;
