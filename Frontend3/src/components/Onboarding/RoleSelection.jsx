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
        <div className="w-full md:w-1/2 mx-auto bg-white/10 backdrop-blur-3xl rounded-3xl md:p-10 max-md:py-10 max-md:px-5 border border-white/20 shadow-lg">
          <h2 className="text-center text-3xl font-semibold">Select Your Role</h2>

          <div className="  my-6 grid grid-cols-1 gap-10">
            <label
              className={`grid grid-cols-3 items-center cursor-pointer transition-all duration-500 ${selectedRole === 'intan' ? 'mx-20' : 'hover:mx-32'
                }`}
            >
              <UserCircle2 className="justify-self-center size-20 text-blue-500" />
              <input
                type="radio"
                name="role"
                className="justify-self-center"
                value="intan"
                checked={selectedRole === 'intan'}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <span className="justify-self-center text-2xl font-semibold">Intern</span>
            </label>

            <label
              className={`grid grid-cols-3 items-center cursor-pointer transition-all duration-500 ${selectedRole === 'mentor' ? 'mx-20' : 'hover:mx-32'
                }`}
            >
              <GraduationCap className="justify-self-center size-20 text-blue-500" />
              <input
                type="radio"
                name="role"
                className="justify-self-center"
                value="mentor"
                checked={selectedRole === 'mentor'}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <span className="justify-self-center text-2xl font-semibold">Mentor</span>
            </label>

            <label
              className={`grid grid-cols-3 items-center cursor-pointer transition-all duration-500 ${selectedRole === 'recruiter' ? 'mx-20' : 'hover:mx-32'
                }`}
            >
              <Briefcase className="justify-self-center size-20 text-blue-500" />
              <input
                type="radio"
                name="role"
                className="justify-self-center"
                value="recruiter"
                checked={selectedRole === 'recruiter'}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <span className="justify-self-center text-2xl font-semibold">Recruiter</span>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleRoleSelect}
              type="submit"
              id="animatedBtn"
              disabled={!isFormComplete}
              className={`px-10 py-2 font-bold text-xl  text-white rounded-full border-2 bg-[#0691FF] relative overflow-hidden z-10 transition duration-150 ${isFormComplete
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
