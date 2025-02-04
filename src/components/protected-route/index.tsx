import { Navigate, useLocation } from 'react-router';
import { selectorUser } from '../../services/userSlice';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

const logPaths = ['/login', '/register', '/forgot-password', '/reset-password'];

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { selectorIsAuthChecked, selectorUserData } = selectorUser;

  const isAuthChecked = useSelector(selectorIsAuthChecked);
  const userData = useSelector(selectorUserData);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (userData) {
    if (logPaths.includes(location.pathname)) return <Navigate to={'/'} />;
    return children;
  }

  if (logPaths.includes(location.pathname)) return children;

  return <Navigate to={'/login'} />;
};
