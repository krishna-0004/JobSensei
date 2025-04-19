import React, { useEffect, useState } from 'react';
import axios from 'axios';

const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('❌ Failed to decode token:', err);
    return null;
  }
};

export default function IntanProfile() {
  const token = localStorage.getItem('token');
  const userData = decodeJwt(token);
  const userId = userData?.id;

  const [avatar, setAvatar] = useState('');
  const [preview, setPreview] = useState('');
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/user/profile/${userId}`);
      setProfile(res.data);
      setAvatar(res.data.avatar);
    } catch (err) {
      console.error('❌ Fetch profile error:', err);
    }
  };

  useEffect(() => {
    if (userId) fetchProfile();
  }, [userId]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:4000/user/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setAvatar(res.data.imageUrl);
    } catch (err) {
      console.error('❌ Upload error:', err);
    }
  };

  const handleImageUploadForNested = async (e, field, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:4000/user/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const updated = [...(profile[field] || [])];
      updated[index].imageUrl = res.data.imageUrl;
      setProfile((prev) => ({ ...prev, [field]: updated }));
    } catch (err) {
      console.error(`❌ Upload error for ${field}[${index}] image:`, err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, index, field, key) => {
    const updated = [...(profile[field] || [])];
    updated[index][key] = e.target.value;
    setProfile((prev) => ({ ...prev, [field]: updated }));
  };

  const addNestedItem = (field, newItem) => {
    setProfile((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), newItem],
    }));
  };

  const deleteNestedItem = (field, index) => {
    const updated = [...(profile[field] || [])];
    updated.splice(index, 1);
    setProfile((prev) => ({ ...prev, [field]: updated }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:4000/user/profile/${userId}`, profile);
      setProfile(res.data.user);
      setEditing(false);
      alert('✅ Profile updated');
      fetchProfile();
    } catch (err) {
      console.error('❌ Update error:', err);
      alert('❌ Failed to update profile');
    }
  };

  return (
    <section className="overflow-y-auto h-screen m-4 mb-0 bg-gray-100 py-6 px-8">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8">Intan Profile</h2>

      <div className="mb-4 flex flex-col items-center gap-6">
        <div className="flex justify-center items-center gap-4">
          {avatar && (
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
          )}
          {editing && (
            <div className="flex flex-col items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm file:bg-blue-500 file:text-white file:rounded-full file:px-4 file:py-2"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 rounded object-cover border-2 border-gray-300"
                />
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {editing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      <div className="space-y-6">
        {editing ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <input
                name="name"
                value={profile.name || ''}
                onChange={handleInputChange}
                className="input w-full border-2 border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
              />
              <input
                name="phone"
                value={profile.phone || ''}
                onChange={handleInputChange}
                className="input w-full border-2 border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone"
              />
              <input
                name="location"
                value={profile.location || ''}
                onChange={handleInputChange}
                className="input w-full border-2 border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Location"
              />
              <input
                name="bio"
                value={profile.bio || ''}
                onChange={handleInputChange}
                className="input w-full border-2 border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bio"
              />
              <input
                name="gender"
                value={profile.gender || ''}
                onChange={handleInputChange}
                className="input w-full border-2 border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Gender"
              />
              <input
                name="dateOfBirth"
                value={profile.dateOfBirth || ''}
                onChange={handleInputChange}
                className="input w-full border-2 border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Date of Birth"
              />
              <input
                name="skills"
                value={(profile.skills || []).join(', ')}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    skills: e.target.value.split(',').map((s) => s.trim()),
                  }))
                }
                className="input w-full border-2 border-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Skills (comma separated)"
              />
            </div>

            {/* Education Section */}
            <h4 className="text-xl font-bold text-gray-800 mt-6">Education</h4>
            {(profile.education || []).map((edu, i) => (
              <div key={i} className="bg-white shadow-lg p-6 rounded-lg mb-6 space-y-4">
                <input
                  value={edu.institution}
                  onChange={(e) => handleNestedChange(e, i, 'education', 'institution')}
                  className="input w-full border-b-2 border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Institution"
                />
                <input
                  value={edu.degree}
                  onChange={(e) => handleNestedChange(e, i, 'education', 'degree')}
                  className="input w-full border-b-2 border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Degree"
                />
                <input
                  value={edu.field}
                  onChange={(e) => handleNestedChange(e, i, 'education', 'field')}
                  className="input w-full border-b-2 border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Field of Study"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={edu.startYear}
                    onChange={(e) => handleNestedChange(e, i, 'education', 'startYear')}
                    className="input w-full border-b-2 border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Start Year"
                  />
                  <input
                    value={edu.endYear}
                    onChange={(e) => handleNestedChange(e, i, 'education', 'endYear')}
                    className="input w-full border-b-2 border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="End Year"
                  />
                </div>
                <button
                  onClick={() => deleteNestedItem('education', i)}
                  className="mt-4 text-white bg-red-600 rounded-full py-2 px-6 hover:bg-red-700 transition"
                >
                  Delete Education
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                addNestedItem('education', {
                  institution: '',
                  degree: '',
                  field: '',
                  startYear: '',
                  endYear: '',
                })
              }
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              ➕ Add Education
            </button>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <p className="text-lg text-gray-800"><b>Name:</b> {profile.name}</p>
              <p className="text-lg text-gray-600"><b>Phone:</b> {profile.phone}</p>
              <p className="text-lg text-gray-600"><b>Location:</b> {profile.location}</p>
              <p className="text-lg text-gray-600"><b>Gender:</b> {profile.gender}</p>
              <p className="text-lg text-gray-600"><b>Date of Birth:</b> {profile.dateOfBirth}</p>
              <p className="text-lg text-gray-600"><b>Bio:</b> {profile.bio}</p>
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => (editing ? handleUpdate() : setEditing(true))}
        className="btn mt-6 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
      >
        {editing ? '💾 Save Changes' : 'Edit Profile'}
      </button>
    </section>
  );
}
