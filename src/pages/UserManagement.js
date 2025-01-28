import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import api from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulated users with all required fields
        const response = await api.get('/users');
        const enrichedUsers = response.data.map((user) => ({
          id: user.id,
          firstName: `First${user.id}`, // Simulated First Name
          lastName: `Last${user.id}`,  // Simulated Last Name
          email: user.email,
          department: 'Engineering',  // Simulated Department
        }));
        setUsers(enrichedUsers);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
      }
    };
    fetchUsers();
  }, []);

  const addUser = async (newUser) => {
    try {
      const response = await api.post('/users', newUser);
      setUsers([...users, { ...newUser, id: response.data.id }]);
    } catch (err) {
      setError('Failed to add user.');
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      await api.put(`/users/${updatedUser.id}`, updatedUser);
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setEditingUser(null);
    } catch (err) {
      setError('Failed to update user.');
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  return (
    <div className="container mt-4">
      <h1>User Management</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-8">
          <UserList users={users} onEdit={setEditingUser} onDelete={deleteUser} />
        </div>
        <div className="col-md-4">
          <UserForm
            onSubmit={editingUser ? updateUser : addUser}
            initialData={editingUser}
            onCancel={() => setEditingUser(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
