import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  // Dummy total stats (replace these with real data from API later)
  const totalUsers = 10;
  const totalMentors = 5;
  const totalRecruiters = 1;
  const totalJobs = 151;

  // Fetch users with pending approval
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/admin/pending', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching pending users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleApprove = async (userId) => {
    try {
      await axios.put(
        `http://localhost:4000/user/admin/approve/${userId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.put(
        `http://localhost:4000/admin/reject-user/${userId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  return (
    <div className="h-screen overflow-y-auto max-md:pt-16 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-sm font-medium text-gray-600">Total Users</h2>
          <p className="text-2xl font-bold text-blue-700">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-sm font-medium text-gray-600">Total Mentors</h2>
          <p className="text-2xl font-bold text-blue-700">{totalMentors}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-sm font-medium text-gray-600">Total Recruiters</h2>
          <p className="text-2xl font-bold text-blue-700">{totalRecruiters}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-sm font-medium text-gray-600">Total Jobs</h2>
          <p className="text-2xl font-bold text-blue-700">{totalJobs}</p>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Approvals</h2>

        {users.length === 0 ? (
          <p className="text-gray-500">🎉 No users pending approval.</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user._id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => handleApprove(user._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleReject(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    ❌ Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
