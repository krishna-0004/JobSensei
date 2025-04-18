import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function InternProfile() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const token = localStorage.getItem('token');

  // Fetch avatar on mount
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const res = await axios.get('http://localhost:4000/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvatarUrl(res.data.avatar);
      } catch (err) {
        console.error('Fetch avatar error:', err);
      }
    };
    fetchAvatar();
  }, [token]);

  // File change preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Upload to backend
  const handleUpload = async () => {
    if (!selectedFile) return alert('Please select a file');

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const res = await axios.put(
        'http://localhost:4000/user/upload-avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAvatarUrl(res.data.avatar);
      setSelectedFile(null);
      setPreview('');
      alert('Avatar uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed');
    }
  };

  return (
    <section className="p-4 max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Intern Profile</h2>

      {/* Display avatar */}
      <div className="mb-4">
        <img
          src={avatarUrl || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mx-auto"
        />
      </div>

      {/* Preview before upload */}
      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover mx-auto border"
          />
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload Photo
        </button>
      </div>
    </section>
  );
}
