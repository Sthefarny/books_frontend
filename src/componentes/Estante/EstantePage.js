import React, { useState } from 'react';
import styled from 'styled-components';
import LivrosSugeridos from '../Sugeridos/LivrosSugeridos';

const IconeFechar = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #333;
  font-size: 30px;
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;

  &:hover {
    color: #ff5c5c;
    transform: scale(1.1); /* Aumenta o tamanho ao passar o mouse */
  }

  &:focus {
    outline: none;
  }
`;
// Estilos para as estrelas de avaliação
const Estrela = styled.span`
  font-size: 20px;
  color: ${props => (props.preenchida ? '#FFD700' : '#ddd')}; /* Estrela dourada ou cinza */
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  max-width: 500px;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
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

const LinkLivro = styled.a`
  display: block; /* Garante que o link ocupe toda a linha */
  margin-bottom: 15px; /* Espaço entre o link e o botão */
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
  }
`;

const BotaoExcluir = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #ff5c5c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff4040;
  }
`;


const EstantePage = () => {
  const [estante, setEstante] = useState(() => JSON.parse(localStorage.getItem('estante')) || []);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  const handleLivroClick = (livro) => {
    setLivroSelecionado(livro);
  };

  const fecharModal = () => {
    setLivroSelecionado(null);
  };

  const removerLivro = (id) => {
    const novaEstante = estante.filter((livro) => livro.id !== id);
    setEstante(novaEstante);
    localStorage.setItem('estante', JSON.stringify(novaEstante));
    fecharModal(); // Fechar modal após exclusão
    alert('Livro removido com sucesso.');
  };

  // Função para renderizar as estrelas de avaliação
  const renderizarEstrelas = (avaliacao, livro, setLivro) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Estrela
        key={index}
        preenchida={index < avaliacao}
        onClick={() => {
          // Atualiza a avaliação do livro
          const novaAvaliacao = index + 1;
          const estanteAtualizada = estante.map((l) =>
            l.id === livro.id ? { ...l, avaliacao: novaAvaliacao } : l
          );
          setEstante(estanteAtualizada);
          localStorage.setItem('estante', JSON.stringify(estanteAtualizada));
          alert(`Você deu ${novaAvaliacao} estrelas!`);
        }}
      >
        ★
      </Estrela>
    ));
  };

  return (
    <div>
      <h1>Minha Estante</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {estante.map((livro) => (
          <LivroItem key={livro.id}>
            <ImagemLivro
              src={livro.imagem}
              alt={livro.nome}
              onClick={() => handleLivroClick(livro)}
            />
            <p>{livro.nome}</p>
            {renderizarEstrelas(livro.avaliacao || 0, livro, setEstante)} {/* Exibe a avaliação, caso tenha */}
          </LivroItem>
          
        ))}
      </div>

      {livroSelecionado && (
        <>
          <Overlay onClick={fecharModal} />
          <Modal>
          <IconeFechar onClick={fecharModal}>&times;</IconeFechar>
            <h2>{livroSelecionado.nome}</h2>
            <p><strong>Autor:</strong> {livroSelecionado.autor}</p>
            <p>{livroSelecionado.descricao ? livroSelecionado.descricao : 'Descrição não disponível.'}</p>
            <p><strong>Avaliação:</strong> {renderizarEstrelas(livroSelecionado.avaliacao || 0, livroSelecionado, setEstante)}</p>
            <LinkLivro href={livroSelecionado.link} target="_blank" rel="noopener noreferrer">
    Onde encontrar este livro
  </LinkLivro>
            <BotaoExcluir onClick={() => removerLivro(livroSelecionado.id)}>Excluir</BotaoExcluir>
          </Modal>
        </>
      )}
    </div>
  );
};

export default EstantePage;
