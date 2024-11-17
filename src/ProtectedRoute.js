import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // Se não estiver logado, redireciona para o login
    return <Navigate to="/login" />;
  }

  return children; // Se estiver logado, renderiza o componente
};

export default ProtectedRoute;
