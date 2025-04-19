// src/utils/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);

    const email = payload.email?.trim().toLowerCase();
    const role = payload.role?.trim().toLowerCase();

    // ✅ Allow admin access by specific email
    if (email === 'krishnakadukar0004@gmail.com' && allowedRole === 'admin') {
      return children;
    }

    // ✅ Match regular role-based access
    if (role === allowedRole) {
      return children;
    }

    // ❌ Role mismatch
    return <Navigate to="/" replace />;
  } catch (err) {
    console.error('Failed to decode token in ProtectedRoute:', err);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
