import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
    if (tokenFromUrl) saveToken(tokenFromUrl);

    const token = tokenFromUrl || localStorage.getItem('token');
    if (!token) {
      console.warn("⚠️ No token found");
      navigate('/login');
      return;
    }

    const user = decodeJwt(token);
    if (!user) {
      console.warn("⚠️ Token decode failed");
      navigate('/login');
      return;
    }

    const email = user.email?.trim().toLowerCase();
    const role = user.role?.trim().toLowerCase();
    const userId = user.id;

    if (email === 'krishnakadukar0004@gmail.com') {
      navigate('/admin');
      return;
    }

    // 🔁 Get fresh data from backend
    fetch(`http://localhost:4000/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) {
          console.error('❌ Failed to fetch user info', data.error);
          navigate('/login');
          return;
        }

        console.log('📦 Fetched user:', data);

        if (['intan', 'mentor', 'recruiter'].includes(data.role)) {
          if (data.isApproved) {
            navigate(`/${data.role}`);
          } else {
            navigate('/common-profile');
          }
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.error('❌ Fetch error:', err);
        navigate('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  return <div>{loading ? <h2>Loading user info...</h2> : <h2>Redirecting...</h2>}</div>;
};

export default AuthSuccess;
