import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Userbook from './Userbook';
import Addreactbook from './Addreactbook';

const Alluser = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:4000/user/All');
      console.log('Response:', res.data);
      setUsers(res.data.user)
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full min-h-screen bg-green-400">
      <Navbar />
      <div className="w-full mt-2 flex justify-center">
        <table className="w-3/4 border border-black text-left bg-white">
          <thead>
            <tr className="bg-gray-200 text-xl font-semibold">
              <th className="border p-2">UserName</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Books Read</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id || index} className="border-t">
                  <td className="border p-2">{user.userName}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    {(user.Bookread) && user.Bookread.length > 0 ? (
                      user.Bookread.map((book, i) => (
                        <div key={i}>{book.BookTitle}</div>
                      ))
                    ) : (
                      'No books read'
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Userbook />
      <Addreactbook />
    </div>
  );
};

export default Alluser;
