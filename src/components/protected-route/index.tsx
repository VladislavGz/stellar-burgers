import { Navigate } from 'react-router';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = true;

  if (!user) {
    // если пользователя в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' />;
  }

  return children;
};
