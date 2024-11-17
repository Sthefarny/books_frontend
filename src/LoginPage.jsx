import { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
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
      <h2>Login</h2>
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
    </LoginContainer>
  );
};

export default LoginPage;
