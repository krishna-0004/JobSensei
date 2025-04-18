import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import axios from 'axios';
import {
  User,
  Info,
  MapPin,
  Phone,
  BadgePlus,
} from 'lucide-react';

const CommonProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const bgRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    phone: '',
    skills: '',
  });

  const isFormComplete = Object.values(formData).every((field) => field.trim() !== '');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/common-info`, {
        ...formData,
        skills: formData.skills.split(',').map((skill) => skill.trim()),
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('✅ Common profile updated');
      navigate('/select-role');
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Unknown error';
      console.error('❌ Error:', message);
      alert(message);
    }
  };

  

  return (
    <>
      <section className="bg-[#F0F9FF]">


        <div className="relative z-20 md:px-10 px-4 py-5 font-RS text-black h-screen flex justify-center items-center ">
          <div className='w-full md:max-w-2xl md:mx-auto bg-[#F0F9FF] backdrop-blur-3xl rounded-3xl md:p-10  max-md:py-10 max-md:px-5 border border-white/20 shadow-lg'>
            <h2 className='text-center text-black font-bold text-3xl'>Complete Your Profile</h2>

            <form onSubmit={handleSubmit} className='my-4 flex flex-col gap-10'>
              <InputField icon={<User />} name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
              <TextAreaField icon={<Info />} name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} />
              <InputField icon={<MapPin />} name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
              <InputField icon={<Phone />} name="phone" placeholder="Phone (+91...)" value={formData.phone} onChange={handleChange} type="tel" />
              <InputField icon={<BadgePlus />} name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} />

              <div className="flex justify-end">
                <button
                  type="submit"
             
                  disabled={!isFormComplete}
                  className={`px-10 py-2 font-bold text-xl text-black rounded-full border-2  relative overflow-hidden z-10 transition duration-150 ${
                    isFormComplete ? 'hover:scale-110 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span className="absolute inset-0 bg-[#0691FF]  z-0" id="gradientBg"></span>
                  <span className="relative z-10 text-white">Next</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

// Reusable InputField
const InputField = ({ icon, name, placeholder, value, onChange, type = 'text' }) => (
  <div className="flex items-center gap-3 bg-white/10 border border-gray-700 p-3 rounded-xl">
    <div className="text-black">{icon}</div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent outline-none text-black placeholder:text-black/60"
      required
    />
  </div>
);

// Reusable TextAreaField
const TextAreaField = ({ icon, name, placeholder, value, onChange }) => (
  <div className="flex items-start gap-3 bg-white/10 border border-gray-800 p-3 rounded-xl">
    <div className="text-black mt-1">{icon}</div>
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent outline-none text-black placeholder:text-black/60 resize-none"
      required
    />
  </div>
);

export default CommonProfile;
