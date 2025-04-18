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

export default function RecruiterProfile() {
  const [avatar, setAvatar] = useState('');
  const [preview, setPreview] = useState('');
  const token = localStorage.getItem('token');
  const userData = decodeJwt(token);
  const userId = userData?.id;

  const fetchAvatar = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/user/${userId}`);
      setAvatar(res.data.avatar);
    } catch (err) {
      console.error('❌ Fetch avatar error:', err);
    }
  };

  useEffect(() => {
    if (userId) fetchAvatar();
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

  return (
    <section>
      <h2>Recruiter Profile</h2>

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
    </section>
  );
}
