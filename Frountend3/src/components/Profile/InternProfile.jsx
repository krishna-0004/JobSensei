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
    formData.append('avatar', file);

    try {
      const res = await axios.put('http://localhost:4000/user/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setAvatar(res.data.avatarUrl);
    } catch (err) {
      console.error('❌ Upload error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedData = { ...profile };

      // Convert specific fields from comma-separated strings to arrays
      ['skills', 'education', 'awards', 'certifications', 'experience'].forEach((field) => {
        if (typeof updatedData[field] === 'string') {
          updatedData[field] = updatedData[field]
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item !== '');
        }
      });

      const res = await axios.put(
        `http://localhost:4000/user/profile/${userId}`,
        updatedData
      );

      setProfile(res.data.user);
      setEditing(false);
      alert('✅ Profile updated');
    } catch (err) {
      console.error('❌ Update error:', err);
      alert('❌ Failed to update profile');
    }
  };

  return (
    <section>
      <h2>Intan Profile</h2>

      {avatar && (
        <div style={{ marginBottom: '10px' }}>
          <img
            src={avatar}
            alt="Avatar"
            width={120}
            height={120}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
      )}

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div style={{ marginTop: '10px' }}>
          <p>Preview:</p>
          <img src={preview} alt="Preview" width={80} />
        </div>
      )}

      <hr />

      <div style={{ marginTop: '20px' }}>
        {[
          'name',
          'phone',
          'location',
          'gender',
          'skills',
          'awards',
          'certifications',
          'education',
          'experience',
        ].map((field) => (
          <div key={field} style={{ marginBottom: '10px' }}>
            <strong>{field.toUpperCase()}:</strong>{' '}
            {editing ? (
              <input
                type="text"
                name={field}
                value={
                  Array.isArray(profile[field])
                    ? profile[field].join(', ')
                    : profile[field] || ''
                }
                onChange={handleChange}
                placeholder="Comma-separated if multiple"
              />
            ) : (
              <span>
                {Array.isArray(profile[field])
                  ? profile[field].join(', ')
                  : profile[field]}
              </span>
            )}
          </div>
        ))}

        {/* Projects */}
        <div style={{ marginBottom: '10px' }}>
          <strong>PROJECTS:</strong>
          {Array.isArray(profile.projects) &&
            profile.projects.map((proj, index) => (
              <div key={index} style={{ paddingLeft: '15px' }}>
                <p><b>Name:</b> {proj.name}</p>
                <p><b>Desc:</b> {proj.description}</p>
                <p><b>Link:</b> <a href={proj.link} target="_blank" rel="noreferrer">{proj.link}</a></p>
              </div>
            ))}
        </div>
      </div>

      <button onClick={() => (editing ? handleUpdate() : setEditing(true))}>
        {editing ? 'Save Changes' : 'Edit Profile'}
      </button>
    </section>
  );
}
