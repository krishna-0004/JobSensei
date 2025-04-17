import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
};

export default Navbar;
