import { Titulo } from '../Titulo';
import CardRecomenda from '../CardRecomenda';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const UltimosLancamentosContainer = styled.section`
    background-color: #FFF5EE;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
`;

const NovosLivrosContainer = styled.div`
    margin-top: 30px;
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 20px;
`;

const LivroItem = styled.img`
    width: 150px;
    height: auto;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }
`;

function UltimosLancamentos() {
    const [livros, setLivros] = useState([]);
    const [livrosVisiveis, setLivrosVisiveis] = useState([]);
    const [indiceInicial, setIndiceInicial] = useState(0);
    const [livroRecomendado, setLivroRecomendado] = useState(null);
    const [estante, setEstante] = useState(() => JSON.parse(localStorage.getItem('estante')) || []);
    
    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const response = await fetch('http://localhost:8000/livros');
                const data = await response.json();
                setLivros(data);
                setLivroRecomendado(data[0]); // Primeiro livro como padrão
            } catch (error) {
                console.error('Erro ao buscar livros:', error);
            }
        };

        fetchLivros();
    }, []);

    useEffect(() => {
        if (livros.length > 0) {
            setLivrosVisiveis(livros.slice(indiceInicial, indiceInicial + 5));
        }
    }, [livros, indiceInicial]);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndiceInicial((prevIndice) => (prevIndice + 5) % livros.length);
        }, 5000); // Troca os livros visíveis a cada 5 segundos

        return () => clearInterval(intervalo);
    }, [livros]);

    useEffect(() => {
        const intervaloRecomenda = setInterval(() => {
            setLivroRecomendado((prevLivro) => {
                const indiceAtual = livros.findIndex((livro) => livro.id === prevLivro.id);
                return livros[(indiceAtual + 1) % livros.length];
            });
        }, 7000); // Troca o livro recomendado a cada 7 segundos

        return () => clearInterval(intervaloRecomenda);
    }, [livros]);

    const adicionarEstante = (livro) => {
        const confirmar = window.confirm(`Tem certeza que deseja adicionar "${livro.nome}" à sua estante?`);
    
        if (confirmar) {
            if (!estante.find((item) => item.id === livro.id)) {
                const novaEstante = [...estante, livro];
                setEstante(novaEstante);
                localStorage.setItem('estante', JSON.stringify(novaEstante));
                alert(`${livro.nome} foi adicionado à sua estante!`);
            } else {
                alert('Este livro já está na estante.');
            }
        }
    };
    

    return (
        <UltimosLancamentosContainer>
            <Titulo cor="#1C1C1C" tamanhoFonte="36px">
                Talvez você goste desse livro
            </Titulo>
            <NovosLivrosContainer>
                {livrosVisiveis.map((livro) => (
                    <LivroItem
                        key={livro.id}
                        src={livro.imagem}
                        alt={livro.nome}
                        onClick={() => adicionarEstante(livro)}
                    />
                ))}
            </NovosLivrosContainer>

            {livroRecomendado && (
                <CardRecomenda
                    titulo="Talvez você se interesse por ... "
                    subtitulo={livroRecomendado.nome}
                    descricao={livroRecomendado.descricao}
                    img={livroRecomendado.imagem}
                    link={livroRecomendado.link}
                />
            )}
        </UltimosLancamentosContainer>
    );
}

export default UltimosLancamentos;
