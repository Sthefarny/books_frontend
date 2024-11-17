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
          <button onClick={onLogout}>Sair</button>
        </UserGreeting>
      )}
    </HeaderContainer>
  );
}

export default Header;
