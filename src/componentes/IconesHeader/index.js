import { useNavigate } from 'react-router-dom'; // Importação para navegação
import perfil from '../../imagens/perfil.svg';
import styled from 'styled-components';

const Icone = styled.li`
  margin-right: 40px;
  width: 25px;
  cursor: pointer; /* Adiciona um cursor de pointer */
`;

const Icones = styled.ul`
  display: flex;
  align-items: center;
`;

function IconesHeader() {
  const navigate = useNavigate(); // Hook para redirecionamento

  const handlePerfilClick = () => {
    navigate('/login'); // Redireciona para a página de login
  };

  const icones = [
    { src: perfil, onClick: handlePerfilClick } // Ícone de perfil com evento
  ];

  return (
    <Icones>
      {icones.map((icone, index) => (
        <Icone key={index} onClick={icone.onClick}>
          <img src={icone.src} alt={`Ícone ${index}`} />
        </Icone>
      ))}
    </Icones>
  );
}

export default IconesHeader;
