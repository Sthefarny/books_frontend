import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const BotaoAdicionar = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px; /* Diminuindo o tamanho do botão */
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px; /* Tamanho da fonte menor */
  margin-top: 10px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
  }
`;

// Componentes de Estilo
const Container = styled.div`
  padding: 20px;
`;

const CategoriaContainer = styled.div`
  margin-bottom: 40px;
`;

const TituloCategoria = styled.h2`
  margin-bottom: 10px;
`;

const LivrosGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const LivroItem = styled.div`
  text-align: center;
  width: 150px;
  cursor: pointer; /* Adiciona cursor de clique ao livro */
`;

const ImagemLivro = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const adicionarNaEstante = (livro) => {
    const estante = JSON.parse(localStorage.getItem('estante')) || [];
    const livroExiste = estante.find(item => item.id === livro.id);
  
    if (!livroExiste) {
      estante.push(livro);
      localStorage.setItem('estante', JSON.stringify(estante));
      alert('Livro adicionado à estante!');
    } else {
      alert('Este livro já está na estante.');
    }
  };

  
const CategoriasPage = () => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [livroSelecionado, setLivroSelecionado] = useState(null); // Estado para o livro selecionado

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await fetch('http://localhost:8000/livros'); // Substitua pela URL da sua API
        const data = await response.json();
        setLivros(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);

  const categoriasAgrupadas = livros.reduce((acc, livro) => {
    (acc[livro.categoria] = acc[livro.categoria] || []).push(livro);
    return acc;
  }, {});

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      {Object.keys(categoriasAgrupadas).map((categoria) => (
        <CategoriaContainer key={categoria}>
          <TituloCategoria>{categoria}</TituloCategoria>
          <LivrosGrid>
            {categoriasAgrupadas[categoria].map((livro) => (
              <LivroItem key={livro.id}>
                <ImagemLivro src={livro.imagem} alt={livro.nome} />
                <p>{livro.nome}</p>
                <BotaoAdicionar onClick={() => adicionarNaEstante(livro)}>
                  <FaPlus style={{ marginRight: '5px' }} /> {/* Ícone de "mais" */}
                  Adicionar à Estante
                </BotaoAdicionar>
              </LivroItem>
            ))}
          </LivrosGrid>
        </CategoriaContainer>
        
      ))}
    </Container>
  );
};

export default CategoriasPage;
