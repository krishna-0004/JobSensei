import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();

  const saveToken = (token) => {
    localStorage.setItem('token', token);
  };

  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error('❌ Failed to decode token:', err);
      return null;
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    console.log("🔍 Token from URL:", tokenFromUrl);

    if (tokenFromUrl) {
      saveToken(tokenFromUrl); // Save immediately
    }

    // Always get from localStorage (persistent)
    const token = tokenFromUrl || localStorage.getItem('token');

    if (!token) {
      console.warn("⚠️ No token available anywhere");
      navigate('/login');
      return;
    }

    const user = decodeJwt(token);

    if (!user) {
      console.warn("⚠️ Token decoding failed");
      navigate('/login');
      return;
    }

    console.log('✅ Decoded user:', user);

    const email = user.email?.trim().toLowerCase();
    const role = user.role?.trim().toLowerCase();

    if (email === 'krishnakadukar0004@gmail.com') {
      console.log("🔐 Admin detected, redirecting to /admin");
      navigate('/admin');
      return;
    }

    switch (role) {
      case 'intan':
      case 'mentor':
      case 'recruiter':
        console.log(`🚀 Redirecting to /common-profile for role: ${role}`);
        navigate('/common-profile');
        break;
      default:
        console.warn("❓ Unknown role, going to home");
        navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Authentication successful. Redirecting...</h2>
    </div>
  );
};

export default AuthSuccess;
