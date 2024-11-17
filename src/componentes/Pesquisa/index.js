import Input from "../Input"
import { useState } from "react"
import {useEffect} from "react"
import styled from "styled-components"
import { getLivros } from "../../servicos/livros"
import { postFavorito } from "../../servicos/favoritos"


const PesquisaContainer = styled.section`
background-image: linear-gradiente(90deg,#002F52 35%, #326589 165%);
color: #FFF;
text-align: center;
padding: 85px 0;
height:270px;
width:100%;
`
const Titulo = styled.h2`´
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
`
const Subtitulo = styled.h3`
    font-size: 16px
    font-weight: 500;
    margin-bottom: 40px;

`
const Resultado = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-bottom: 20px;
   cursor: pointer;
   p {
       width: 200px;
   }
   img {
       width: 80px;
   }
   &:hover {
       border: 1px solid white;
   }
`

function Pesquisa() {
    const [livrosPesquisados, setLivrosPesquisados] = useState([])
    const [livros , setLivros] = useState([])

    useEffect(() =>{
        fetchLivros()
    },[])

   async function fetchLivros(){
        const livrosDaAPI = await getLivros()
        setLivros(livrosDaAPI)
    }

    async function insereFavorito(id){
        await postFavorito(id)
        alert(`Livro de id:${id} inserido!`)
    }
 
    return (
        <PesquisaContainer>
            <Titulo>Já  sabe por onde começar a procurar?</Titulo>
            <Subtitulo
            >Encontre seu livro </Subtitulo>
            <Input
                placeholder="Escreva sua próxima leitura"
                onBlur={evento => {
                    const textoDigitado = evento.target.value
                    const resultadoPesquisa = livros.filter( livro => livro.nome.includes(textoDigitado))
                    setLivrosPesquisados(resultadoPesquisa)
                } }     
            />
            {livrosPesquisados.map(livro => (
                <Resultado onClick={() => insereFavorito(livro.id)}>
                <img src={livro.src}/>
                <p>{livro.nome}</p>
                </Resultado>
            ))}
        </PesquisaContainer>
    )
}

export default Pesquisa