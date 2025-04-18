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
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Pending Approval</h2>
      {users.length === 0 ? (
        <p>No users are pending approval.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <button onClick={() => handleApprove(user._id)}>Approve</button>
                <button onClick={() => handleReject(user._id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
