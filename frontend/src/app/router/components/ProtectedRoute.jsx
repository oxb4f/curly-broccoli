import { Navigate } from 'react-router';
import { useSession } from '@app/providers/SessionProvider';
import ROUTES from '@/app/router/constants/routes.js';

const ProtectedRoute = ({ children }) => {
  const { user, isPending, hasCredentials } = useSession();

  if ((!user && !isPending) || !hasCredentials) {
    return <Navigate to={ROUTES.AUTH.ROOT} replace></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
