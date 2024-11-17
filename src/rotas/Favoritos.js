import React, { useEffect, useState } from "react";
import { getFavoritos, deleteFavorito } from "../servicos/favoritos"; // Importar a função de deletar

import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa'; // Importando ícone de exclusão do FontAwesome

// Estilo para a imagem do livro
const ImagemLivro = styled.img`
  width: 150px;  /* Largura padrão */
  height: 225px; /* Altura padrão */
  object-fit: cover; /* Garante que a imagem seja recortada para caber no espaço sem distorcer */
`;

// Contêiner para exibir os livros de forma horizontal
const ContainerLivros = styled.div`
  display: flex;
  flex-wrap: wrap;   /* Permite que os itens que não cabem na tela "quebrem" para a linha de baixo */
  gap: 20px;         /* Espaço entre os livros */
  padding: 20px;     /* Espaço interno ao redor dos livros */
  justify-content: flex-start;  /* Alinha os itens à esquerda */
`;

// Estilo para o contêiner de cada livro (imagem e botão) com flex-direction como coluna
const LivroItem = styled.div`
  display: flex;
  flex-direction: column; /* Alinha a imagem e o botão verticalmente */
  align-items: center;    /* Centraliza o conteúdo */
  text-align: center;
  margin-bottom: 20px;
`;

// Estilo do botão com cor vermelha e ícone de exclusão
const BotaoExcluir = styled.button`
  margin-top: 10px;  /* Espaço entre a imagem e o botão */
  padding: 5px 10px; /* Espaçamento interno do botão */
  cursor: pointer;  /* Cursor de ponteiro ao passar sobre o botão */
  background-color: red; /* Cor de fundo vermelha */
  color: white; /* Cor do texto do botão */
  border: none; /* Remove borda */
  border-radius: 5px; /* Borda arredondada */
  display: flex; /* Alinha o ícone ao lado do texto */
  align-items: center; /* Alinha o ícone verticalmente */
  justify-content: center; /* Centraliza o ícone no botão */
  
  &:hover {
    background-color: darkred; /* Cor de fundo do botão quando passar o mouse */
  }
  
  svg {
    margin-right: 5px; /* Espaço entre o ícone e o texto */
  }
`;

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  // Carregar os favoritos
  useEffect(() => {
    const fetchFavoritos = async () => {
      const data = await getFavoritos();
      setFavoritos(data);
    };
    fetchFavoritos();
  }, []);

  // Função para excluir um favorito
  const handleDelete = async (id) => {
    await deleteFavorito(id);  // Chama a função para deletar o favorito
    setFavoritos(favoritos.filter((favorito) => favorito.id !== id)); // Atualiza a lista após a exclusão
  };

  return (
    <div>
      <h1>Meus Favoritos</h1>
      <ContainerLivros>
        {favoritos.map((favorito) => (
          <LivroItem key={favorito.id}>
            <h2>{favorito.nome}</h2>
            {favorito.imagem && <ImagemLivro src={favorito.imagem} alt={favorito.nome} />}
            <BotaoExcluir onClick={() => handleDelete(favorito.id)}>
              <FaTrash /> Excluir
            </BotaoExcluir> {/* Botão com ícone de exclusão */}
          </LivroItem>
        ))}
      </ContainerLivros>
    </div>
  );
};

export default Favoritos;
