import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleRoleSelect = async () => {
    if (!selectedRole) {
      alert('Please select a role.');
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:4000/user/select-role',
        { role: selectedRole },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Save updated token with new role
      localStorage.setItem('token', response.data.token);
      console.log('✅ Role updated:', response.data.user);

      // 🌐 Route based on selected role
      const roleRoutes = {
        intan: '/intan',
        mentor: '/mentor-from',
        recruiter: '/recruiter-form',
      };

      navigate(roleRoutes[selectedRole]);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Unknown error';
      console.error('❌ Role update error:', message);
      alert(message);
    }
  };

  return (
    <div>
      <h2>Select Your Role</h2>
      <div>
        <label>
          <input
            type="radio"
            name="role"
            value="intan"
            checked={selectedRole === 'intan'}
            onChange={(e) => setSelectedRole(e.target.value)}
          />
          Intan
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="mentor"
            checked={selectedRole === 'mentor'}
            onChange={(e) => setSelectedRole(e.target.value)}
          />
          Mentor
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="recruiter"
            checked={selectedRole === 'recruiter'}
            onChange={(e) => setSelectedRole(e.target.value)}
          />
          Recruiter
        </label>
      </div>
      <button onClick={handleRoleSelect}>Continue</button>
    </div>
  );
};

export default RoleSelectionPage;
