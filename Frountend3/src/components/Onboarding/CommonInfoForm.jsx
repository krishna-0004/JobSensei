import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CommonProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    phone: '',
    skills: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put('http://localhost:4000/user/common-info', {
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
      const message =
        error.response?.data?.message || error.message || 'Unknown error';
      console.error('❌ Error:', message);
      alert(message);
    }
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        /><br />

        <input
          type="tel"
          name="phone"
          placeholder="Phone (+91...)"
          value={formData.phone}
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default CommonProfile;
