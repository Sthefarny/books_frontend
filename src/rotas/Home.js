
import Header from '../componentes/Header';
import Pesquisa from '../componentes/Pesquisa';
import UltimosLancamentos from '../componentes/UltimosLancamentos';
 import styled from 'styled-components';
  

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg,#FFB6C1 35%,#FFC0CB 165%);

`

function Home() {
  return (
    <AppContainer>
     <Pesquisa/> 
     <UltimosLancamentos/> 
    </AppContainer>
   
  );
}

export default Home;