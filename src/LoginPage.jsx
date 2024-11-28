import { useState } from 'react';
import styled from 'styled-components';
import livroImg from './imagens/livro.png';


const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(to right, #f5f5f5, #ffffff);
  
`;

// Estilo para a imagem
const ImageContainer = styled.div`
  flex: 1; /* Ocupa metade da tela */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #db7093;

  img {
    width: 60%; /* Ajuste o tamanho conforme necessário */
    height: auto;
  }
`;

// Estilo para o formulário
const FormContainer = styled.div`
  flex: 1; /* Ocupa metade da tela */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #db7093;
  
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra para destacar */
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;



const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      // Salvar no localStorage o nome de usuário
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
  
      // Chamar o método de login com o status 'true'
      onLogin(true);
    } else {
      alert('Preencha ambos os campos de usuário e senha');
    }
  };
  

  return (
    <LoginContainer>
    <ImageContainer>
        <img src={livroImg} alt="Livro" />
      </ImageContainer>
      <FormContainer>
      <h2>Acesse</h2>
      <Input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Entrar</Button>
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginPage;
