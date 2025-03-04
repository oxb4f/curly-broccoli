import { Navigate } from 'react-router';
import { useSession } from '@/components/core/SessionProvider/SessionProvider';
import ROUTES from '@/constants/routes.js';

const ProtectedRoute = ({ children }) => {
  const { user, hasStoredUser, isPending } = useSession();

  if ((!user && !isPending) || !hasStoredUser) {
    return <Navigate to={ROUTES.AUTH.ROOT} replace></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
