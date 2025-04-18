import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserCircle2, GraduationCap, Briefcase } from 'lucide-react';

const RoleSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const isFormComplete = selectedRole !== '';

  const handleRoleSelect = async () => {
    if (!isFormComplete) {
      alert('Please select a role.');
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/select-role`,
        { role: selectedRole },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem('token', response.data.token);
      console.log('✅ Role updated:', response.data.user);

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
    <section className="h-screen font-RS bg-[#F0F9FF]  text-black">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full md:max-w-md mx-auto bg-white/10 backdrop-blur-3xl rounded-3xl md:p-10 max-md:py-10 max-md:px-5 border border-white/20 shadow-lg">
          <h2 className="text-center text-3xl font-semibold">Select Your Role</h2>

          <div className="flex max-md:flex-col max-md:mx-24  md:justify-center md:items-center gap-6 my-6 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="intan"
                checked={selectedRole === 'intan'}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <UserCircle2 />
              <span>Intern</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="mentor"
                checked={selectedRole === 'mentor'}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <GraduationCap />
              <span>Mentor</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={selectedRole === 'recruiter'}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <Briefcase />
              <span>Recruiter</span>
            </label>
          </div>

          <div className="flex justify-end">
          <button
            onClick={handleRoleSelect}
            type="submit"
            id="animatedBtn"
            disabled={!isFormComplete}
            className={`px-10 py-2 font-bold text-xl  text-white rounded-full border-2 bg-[#0691FF] relative overflow-hidden z-10 transition duration-150 ${
              isFormComplete
                ? 'hover:scale-110 cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            
            <span className="relative z-10">Next</span>
          </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleSelectionPage;
