import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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
      // Refresh users list after approval
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
      // Refresh users list after rejection
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl mb-2">Pending Approval</h2>
      {users.length === 0 ? (
        <p className="text-gray-600">No users are pending approval.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="border p-4 rounded shadow-sm">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <div className="mt-2 space-x-2">
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleApprove(user._id)}
                >
                  Approve
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleReject(user._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

  );
};

export default AdminDashboard;
