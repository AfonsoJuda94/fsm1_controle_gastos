// import { createContext, useState } from "react";

// export const GastosContext = createContext();

// export const GastosProvider = ({ children }) => {
//   const [gastos, setGastos] = useState([]);

//   const adicionarGasto = (novoGasto) => {
//     setGastos((prevGastos) => [...prevGastos, novoGasto]); // Usando callback no setState para melhor atualização
//   };

//   return (
//     <GastosContext.Provider value={{ gastos, adicionarGasto }}>
//       {children}
//     </GastosContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import api from "../api"; // Importa a API configurada

export const GastosContext = createContext();

export const GastosProvider = ({ children }) => {
  const [gastos, setGastos] = useState([]);

  // 🔹 Carregar os gastos do backend ao iniciar
  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const response = await api.get("/gastos"); // Chama a API
        setGastos(response.data); // Atualiza o estado
      } catch (error) {
        console.error("Erro ao buscar gastos:", error);
      }
    };

    fetchGastos();
  }, []);

  // 🔹 Função para adicionar gasto no backend
  const adicionarGasto = async (novoGasto) => {
    try {
      const response = await api.post("/gastos", novoGasto);
      setGastos((prevGastos) => [...prevGastos, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar gasto:", error);
    }
  };

  return (
    <GastosContext.Provider value={{ gastos, adicionarGasto }}>
      {children}
    </GastosContext.Provider>
  );
};
