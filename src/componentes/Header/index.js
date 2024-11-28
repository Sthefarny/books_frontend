import Logo from '../Logo';
import OpcoesHeader from '../OpcoesHeader';
import IconesHeader from '../IconesHeader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
    background-color: #FDF5E6;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
`;

const UserGreeting = styled.div`
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #ff1493; /* Cor de fundo (vermelho tomate) */
  color: white; /* Cor do texto */
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Animação suave */

  &:hover {
    background-color: #c71585; /* Cor mais escura ao passar o mouse */
  }

  &:active {
    background-color: #dc143c; /* Cor ainda mais escura ao clicar */
  }
`;


function Header({ isLoggedIn, onLogout }) {
  const username = localStorage.getItem('username'); // Recupera o nome de usuário do localStorage

  return (
    <HeaderContainer className='App-header'>
      <Link to="/">
        <Logo />
      </Link>
      <OpcoesHeader />
      <IconesHeader />
      {isLoggedIn && username && (
        <UserGreeting>
          Olá, {username}
          <LogoutButton onClick={onLogout}>Sair</LogoutButton>
        </UserGreeting>
      )}
    </HeaderContainer>
  );
}

export default Header;
