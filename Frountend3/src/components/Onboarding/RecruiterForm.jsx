import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Building2,
  Globe,
  IdCard,
  Briefcase,
  Users,
  Mail,
  MapPin,
  FileText,
} from 'lucide-react';

const RecruiterForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    registrationId: '',
    industry: '',
    companySize: '',
    businessEmail: '',
    address: '',
    pitchDeckUrl: '',
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormComplete = Object.values(formData).every((field) => field.trim() !== '');

  const handleSubmit = async () => {
    try {
      const payload = {
        businessDetails: {
          ...formData,
          isBusinessSubmitted: true,
        },
      };

      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/recruiter-form`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Recruiter form submitted:', response.data);
      alert('Form submitted for admin approval. You’ll be notified once approved.');
      navigate('/pending');
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error('❌ Submit error:', message);
      alert(message);
    }
  };

  return (
    <section className="min-h-screen font-RS bg-[#F0F9FF] text-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#F0F9FF] rounded-2xl shadow-lg p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-4">Recruiter Business Details</h2>

        <div className="space-y-4">
          <InputField icon={<Building2 />} placeholder="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
          <InputField icon={<Globe />} placeholder="Website" name="website" value={formData.website} onChange={handleChange} />
          <InputField icon={<IdCard />} placeholder="Registration ID" name="registrationId" value={formData.registrationId} onChange={handleChange} />
          <InputField icon={<Briefcase />} placeholder="Industry" name="industry" value={formData.industry} onChange={handleChange} />
          <InputField icon={<Users />} placeholder="Company Size" name="companySize" value={formData.companySize} onChange={handleChange} />
          <InputField icon={<Mail />} type="email" placeholder="Business Email" name="businessEmail" value={formData.businessEmail} onChange={handleChange} />
          <InputField icon={<MapPin />} placeholder="Company Address" name="address" value={formData.address} onChange={handleChange} />
          <InputField icon={<FileText />} placeholder="Pitch Deck URL" name="pitchDeckUrl" value={formData.pitchDeckUrl} onChange={handleChange} />
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          disabled={!isFormComplete}
          className={`mt-6 w-full px-10 py-2 font-bold text-xl text-white bg-[#0691FF] rounded-full border-2 relative overflow-hidden z-10 transition duration-150 ${
            isFormComplete ? 'hover:scale-105 cursor-pointer' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="relative z-10">Submit for Approval</span>
        </button>
      </div>
    </section>
  );
};

const InputField = ({ icon, placeholder, name, value, onChange, type = 'text' }) => (
  <div className="flex items-center text-black gap-3 bg-white/10 border border-gray-600 p-3 rounded-xl">
    <div className="text-black">{icon}</div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent outline-none text-black placeholder:text-gray-400"
    />
  </div>
);

export default RecruiterForm;
