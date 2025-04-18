import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MentorForm = () => {
  const [formData, setFormData] = useState({
    expertise: '',
    linkedIn: '',
    experienceYears: '',
    currentPosition: '',
    company: '',
    certifications: '',
    portfolioUrl: '',
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
        mentorDetails: {
          ...formData,
          expertise: formData.expertise.split(',').map((e) => e.trim()),
          certifications: formData.certifications.split(',').map((c) => c.trim()),
          isMentorSubmitted: true,
        },
      };

      const response = await axios.put('http://localhost:4000/user/mentor-form', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Mentor form submitted:', response.data);
      alert('Form submitted for admin approval. You’ll be notified once approved.');
      navigate('/mentor-pending'); // You can create a waiting screen here
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error('❌ Submit error:', message);
      alert(message);
    }
  };

  return (
    <div>
      <h2>Mentor Details</h2>

      <input
        type="text"
        name="expertise"
        placeholder="Expertise (comma separated)"
        value={formData.expertise}
        onChange={handleChange}
      />
      <input
        type="text"
        name="linkedIn"
        placeholder="LinkedIn Profile URL"
        value={formData.linkedIn}
        onChange={handleChange}
      />
      <input
        type="number"
        name="experienceYears"
        placeholder="Years of Experience"
        value={formData.experienceYears}
        onChange={handleChange}
      />
      <input
        type="text"
        name="currentPosition"
        placeholder="Current Position"
        value={formData.currentPosition}
        onChange={handleChange}
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
      />
      <input
        type="text"
        name="certifications"
        placeholder="Certifications (comma separated)"
        value={formData.certifications}
        onChange={handleChange}
      />
      <input
        type="text"
        name="portfolioUrl"
        placeholder="Portfolio URL"
        value={formData.portfolioUrl}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Submit for Approval</button>
    </div>
  );
};

export default MentorForm;
