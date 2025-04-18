import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const handleSubmit = async () => {
    try {
      const payload = {
        businessDetails: {
          ...formData,
          isBusinessSubmitted: true,
        },
      };

      const response = await axios.put('http://localhost:4000/user/recruiter-form', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Recruiter form submitted:', response.data);
      alert('Form submitted for admin approval. You’ll be notified once approved.');
      navigate('/recruiter-pending'); // You can create a "pending approval" page
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error('❌ Submit error:', message);
      alert(message);
    }
  };

  return (
    <div>
      <h2>Recruiter Business Details</h2>

      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
      />
      <input
        type="text"
        name="registrationId"
        placeholder="Registration ID"
        value={formData.registrationId}
        onChange={handleChange}
      />
      <input
        type="text"
        name="industry"
        placeholder="Industry"
        value={formData.industry}
        onChange={handleChange}
      />
      <input
        type="text"
        name="companySize"
        placeholder="Company Size"
        value={formData.companySize}
        onChange={handleChange}
      />
      <input
        type="email"
        name="businessEmail"
        placeholder="Business Email"
        value={formData.businessEmail}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Company Address"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        type="text"
        name="pitchDeckUrl"
        placeholder="Pitch Deck URL"
        value={formData.pitchDeckUrl}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Submit for Approval</button>
    </div>
  );
};

export default RecruiterForm;
