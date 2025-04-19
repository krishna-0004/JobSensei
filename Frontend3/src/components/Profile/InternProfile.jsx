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
    <section className="p-6 overflow-y-auto h-screen">
      <h2 className="text-2xl font-bold mb-4">Intan Profile</h2>

      <div className="grid grid-cols-4 items-center">
       <div className="">
       {avatar && <img src={avatar} alt="Avatar" className="size-40 rounded-full object-cover" />}
        {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
        {preview && <img src={preview} alt="Preview" className="w-20 h-20 rounded object-cover" />}
       </div>
       <div className="col-span-3">
       <div className="flex flex-col justify-center ">
                  <p className="text-lg text-gray-600 grid grid-cols-4"><b className='justify-self-center'>Name:</b> {profile.name}</p>
                  <p className="text-lg text-gray-600 grid grid-cols-4"><b className='justify-self-center'>Phone:</b> {profile.phone}</p>
                  <p className="text-lg text-gray-600 grid grid-cols-4"><b className='justify-self-center'>Location:</b> {profile.location}</p>
                </div>
       </div>
      </div>

      <div className="space-y-3 mt-6">
        {editing ? (
          <>
            <input name="name" value={profile.name || ''} onChange={handleInputChange} className="input" placeholder="Name" />
            <input name="phone" value={profile.phone || ''} onChange={handleInputChange} className="input" placeholder="Phone" />
            <input name="location" value={profile.location || ''} onChange={handleInputChange} className="input" placeholder="Location" />
            <input name="bio" value={profile.bio || ''} onChange={handleInputChange} className="input" placeholder="Bio" />
            <input name="gender" value={profile.gender || ''} onChange={handleInputChange} className="input" placeholder="Gender" />
            <input name="dateOfBirth" value={profile.dateOfBirth || ''} onChange={handleInputChange} className="input" placeholder="Date of Birth" />
            <input
              name="skills"
              value={(profile.skills || []).join(', ')}
              onChange={(e) => setProfile((prev) => ({ ...prev, skills: e.target.value.split(',').map((s) => s.trim()) }))}
              className="input"
              placeholder="Skills (comma separated)"
            />
            {/* Education */}
            <h4 className="text-lg mt-4">Educ6tion</h4>
            {(profile.education || []).map((edu, i) => (
              <div key={i} className="border p-3 rounded mb-3 space-y-2 bg-gray-50">
                <input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleNestedChange(e, i, 'education', 'institution')}
                  className="input"
                />
                <input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleNestedChange(e, i, 'education', 'degree')}
                  className="input"
                />
                <input
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) => handleNestedChange(e, i, 'education', 'field')}
                  className="input"
                />
                <input
                  placeholder="Start Year"
                  type="number"
                  value={edu.startYear}
                  onChange={(e) => handleNestedChange(e, i, 'education', 'startYear')}
                  className="input"
                />
                <input
                  placeholder="End Year"
                  type="number"
                  value={edu.endYear}
                  onChange={(e) => handleNestedItemChange(e, i, 'education', 'endYear')}
                  className="input"
                />
                <button
                  onClick={() => deleteNestedItem('education', i)}
                  className="text-red-600 text-sm"
                >
                   Delete
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
              className="btn"
            >
              ➕ Add Education
            </button>

            {/* Awards & Certifications */}
            <h4 className="text-lg mt-4">Awar6s & Certifications</h4>
            {(profile.awardsAndCertifications || []).map((award, i) => (
              <div key={i} className="border p-3 rounded mb-3 space-y-2 bg-gray-50">
                <input placeholder="Title" value={award.title} onChange={(e) => handleNestedChange(e, i, 'awardsAndCertifications', 'title')} className="input" />
                <input placeholder="Issuer" value={award.issuer} onChange={(e) => handleNestedChange(e, i, 'awardsAndCertifications', 'issuer')} className="input" />
                <input placeholder="Year" type="number" value={award.year} onChange={(e) => handleNestedChange(e, i, 'awardsAndCertifications', 'year')} className="input" />
                <input placeholder="Credential URL" value={award.credentialUrl} onChange={(e) => handleNestedChange(e, i, 'awardsAndCertifications', 'credentialUrl')} className="input" />
                {award.imageUrl && <img src={award.imageUrl} alt="Award" className="w-32 h-20 object-cover rounded" />}
                <input type="file" accept="image/*" onChange={(e) => handleImageUploadForNested(e, 'awardsAndCertifications', i)} />
                <button onClick={() => deleteNestedItem('awardsAndCertifications', i)} className="text-red-600 text-sm"> Delete</button>
              </div>
            ))}
            <button onClick={() => addNestedItem('awardsAndCertifications', { title: '', issuer: '', year: '', credentialUrl: '', imageUrl: '' })} className="btn">
              ➕ Add Award/Certification
            </button>

            {/* Projects */}
            <h4 className="text-lg mt-4">Proj6cts</h4>
            {(profile.projects || []).map((proj, i) => (
              <div key={i} className="border p-3 rounded mb-3 space-y-2 bg-gray-50">
                <input placeholder="Name" value={proj.name} onChange={(e) => handleNestedChange(e, i, 'projects', 'name')} className="input" />
                <input placeholder="Description" value={proj.description} onChange={(e) => handleNestedChange(e, i, 'projects', 'description')} className="input" />
                <input placeholder="Link" value={proj.link} onChange={(e) => handleNestedChange(e, i, 'projects', 'link')} className="input" />
                <input
                  placeholder="Tech Stack"
                  value={(proj.techStack || []).join(', ')}
                  onChange={(e) => {
                    const updated = [...profile.projects];
                    updated[i].techStack = e.target.value.split(',').map((s) => s.trim());
                    setProfile((prev) => ({ ...prev, projects: updated }));
                  }}
                  className="input"
                />
                {proj.imageUrl && <img src={proj.imageUrl} alt="Project" className="w-32 h-20 object-cover rounded" />}
                <input type="file" accept="image/*" onChange={(e) => handleImageUploadForNested(e, 'projects', i)} />
                <button onClick={() => deleteNestedItem('projects', i)} className="text-red-600 hover:text-red-800 text-sm">
                   Delete
                </button>
              </div>
            ))}
            <button onClick={() => addNestedItem('projects', { name: '', description: '', link: '', techStack: [], imageUrl: '' })} className="btn">
              ➕ Add Project
            </button>
          </>
        ) : (
          <>
            <section className="bg-white p-8 rounded-lg shadow-xl  mx-auto">
              <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Intan Profile</h2>

              {/* Profile Header */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                
                <div className="flex flex-col justify-center">
                  <p className="text-lg text-gray-600"><b>Gender:</b> {profile.gender}</p>
                  <p className="text-lg text-gray-600"><b>Date of Birth:</b> {profile.dateOfBirth}</p>
                  <p className="text-lg text-gray-600"><b>Bio:</b> {profile.bio}</p>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mb-8">
                <p className="text-xl text-gray-600"><b>Skills:</b> {(profile.skills || []).join(', ')}</p>
              </div>

              {/* Awards & Certifications */}
              <div className="mb-12">
                <h3 className="text-2xl text-blue-600 mb-4">🏅 Awards & Certifications</h3>
                {(profile.awardsAndCertifications || []).map((award, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
                    <p className="text-lg text-gray-600">
                      <b>{award.title}</b> from <b>{award.issuer}</b>
                    </p>
                    <p className="text-sm text-gray-500">📅 {award.year} | <a href={award.credentialUrl} target="_blank" className="text-blue-600 hover:underline">Credential</a></p>
                    {award.imageUrl && (
                      <img src={award.imageUrl} alt="Award" className="w-40 h-24 mt-4 object-cover rounded-md border-2 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>

              {/* Education Section */}
              <div className="mb-12">
                <h3 className="text-2xl text-blue-600 mb-4">🎓 Education</h3>
                {(profile.education || []).map((edu, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
                    <p className="text-lg text-gray-600">
                      <b>{edu.degree}</b> in {edu.field} at <b>{edu.institution}</b>
                    </p>
                    <p className="text-sm text-gray-500">📆 {edu.startYear} - {edu.endYear}</p>
                  </div>
                ))}
              </div>

              {/* Projects Section */}
              <div className="mb-12">
                <h3 className="text-2xl text-blue-600 mb-4">💻 Projects</h3>
                {(profile.projects || []).map((proj, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
                    <p className="text-lg text-gray-600">
                      <b>{proj.name}</b>: {proj.description}
                    </p>
                    <p className="text-sm text-gray-500">Tech: {(proj.techStack || []).join(', ')}</p>
                    <a href={proj.link} target="_blank" className="text-blue-600 hover:underline">View Project</a>
                    {proj.imageUrl && (
                      <img src={proj.imageUrl} alt="Project" className="w-48 h-32 mt-4 object-cover rounded-lg border-2 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </section>


          </>
        )}
      </div>

      <button onClick={() => (editing ? handleUpdate() : setEditing(true))} className="btn mt-6">
        {editing ? '💾 Save Changes' : '✏️ Edit Profile'}
      </button>
    </section>
  );
}
