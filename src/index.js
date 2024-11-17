import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './componentes/Header';
import LoginPage from './LoginPage';
import Home from './rotas/Home';
import Favoritos from './rotas/Favoritos';
import CategoriasPage from './componentes/Categoria/CategoriasPage';
import EstantePage from './componentes/Estante/EstantePage';
import { EstanteProvider } from './componentes/context/EstanteContext';
import ProtectedRoute from './ProtectedRoute'; // Importa o componente ProtectedRoute

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
    list-style: none;
  }
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', status);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  };

  return (
    <React.StrictMode>
      <GlobalStyle />
      <BrowserRouter>
        <EstanteProvider>
          <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Home onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favoritos"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Favoritos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categorias"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <CategoriasPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/estante"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <EstantePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </EstanteProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
