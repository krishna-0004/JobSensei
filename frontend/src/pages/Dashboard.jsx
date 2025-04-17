import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/auth/user', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    window.open('http://localhost:4000/auth/logout', '_self');
  };

  if (!user) return <h3>Please login to access dashboard</h3>;

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Dashboard</h2>
      <img src={user.photo} alt="user" width="100" style={{ borderRadius: '50%' }} />
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
