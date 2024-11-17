// src/context/EstanteContext.js
import { createContext, useState, useContext } from 'react';

const EstanteContext = createContext();

export const useEstante = () => useContext(EstanteContext);

export const EstanteProvider = ({ children }) => {
  const [estanteLivros, setEstanteLivros] = useState([]);

  const adicionarLivro = (livro) => {
    setEstanteLivros((prev) => [...prev, livro]);
  };

  return (
    <EstanteContext.Provider value={{ estanteLivros, adicionarLivro }}>
      {children}
    </EstanteContext.Provider>
  );
};
