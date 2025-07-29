import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function PrivateRoute() {
  const { user, loading } = useAuth();
  if (loading) return null; // or a spinner
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
