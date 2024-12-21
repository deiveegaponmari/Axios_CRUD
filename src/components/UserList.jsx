import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await createUser(newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await updateUser(id, editingUser);
      setUsers(users.map(user => (user.id === id ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <h1 className='p-3'>User Management</h1>

      {/* Display Users */}
      <ul className='list-group text-decoration-none'>
        {users.map(user => (
          <li key={user.id} className='list-group-item
            list-group-item-action list-group-item-info p-3 text-center '>
            {editingUser?.id === user.id ? (
              <>
                <input className='rounded me-2'
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
                <input className='rounded me-2'
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
                <button type="button" className="btn btn-success me-2" onClick={() => handleUpdate(user.id)}>Save</button>
                <button  type="button" className="btn btn-dark" onClick={() => setEditingUser(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{user.name} - {user.email}</span>
                <button type="button" className="btn btn-warning me-2" onClick={() => setEditingUser(user)}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Add New User */}
     
        <h2>Add New User</h2>
        <div className='input-group '>
        <input className='form-control'
          placeholder="Name"
          type='text'
          aria-label="Username"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input className='form-control'
          placeholder="Email"
          type='email'
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleCreate}>Add User</button>
      </div>
    </div>
  );
};

export default UserList;
