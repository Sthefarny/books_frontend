import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Estilos
const LivroSugeridoContainer = styled.div`
  margin-top: 40px;
  text-align: center;
  
`;

const LivrosGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const LivroItem = styled.div`
  text-align: center;
  width: 150px;
`;

const ImagemLivro = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  cursor: pointer;
`;

const BotaoFavoritar = styled.button`
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const LivrosSugeridos = ({ livros }) => {
  const [livrosVisiveis, setLivrosVisiveis] = useState([]);
  const [indiceInicial, setIndiceInicial] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceInicial((prev) => (prev + 1) % livros.length);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(intervalo);
  }, [livros]);

  useEffect(() => {
    const novosLivrosVisiveis = livros.slice(indiceInicial, indiceInicial + 4);
    setLivrosVisiveis(novosLivrosVisiveis);
  }, [indiceInicial, livros]);

  const adicionarAosFavoritos = (livro) => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (!favoritos.find((fav) => fav.id === livro.id)) {
      favoritos.push(livro);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      alert(`${livro.nome} adicionado aos favoritos!`);
    } else {
      alert('Este livro já está nos favoritos.');
    }
  };

  return (
    <LivroSugeridoContainer>
      <h2>Talvez Você Goste Desse Livro</h2>
      <LivrosGrid>
        {livrosVisiveis.map((livro) => (
          <LivroItem key={livro.id}>
            <ImagemLivro
              src={livro.imagem}
              alt={livro.nome}
              onClick={() => adicionarAosFavoritos(livro)}
            />
            <p>{livro.nome}</p>
            <BotaoFavoritar onClick={() => adicionarAosFavoritos(livro)}>
              Favoritar
            </BotaoFavoritar>
          </LivroItem>
        ))}
      </LivrosGrid>
    </LivroSugeridoContainer>
  );
};

export default LivrosSugeridos;
