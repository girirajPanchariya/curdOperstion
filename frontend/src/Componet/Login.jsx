import axios from 'axios';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Login = () => {
  const [userForm, setUserForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/user/Login', userForm);
      if(res.data.token){
        localStorage.setItem('token', res.data.token);
        alert(res.data.message);
        navigate('/');
      }else{
        alert('token will be not provide')
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="w-full bg-blue-700 border border-green-700 h-screen text-white">
      <Navbar />
      <div className="w-[30%] border border-white h-95 ml-[35%] mt-[5%] rounded-lg p-4">
        <div className="flex justify-center mt-2">
          <FaUserCircle className="w-16 h-16 rounded-full" />
        </div>

        <div className="flex flex-col gap-4 mt-10">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={userForm.email}
            placeholder="email"
            onChange={handleChange}
            className="w-full h-10 bg-gray-300 text-black rounded-md shadow-2xs"
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userForm.password}
            placeholder="password"
            onChange={handleChange}
            className="w-full h-10 bg-gray-300 text-black rounded-md shadow-2xs"
          />

          <button
            onClick={handleSubmit}
            className="h-10 w-full rounded-full bg-red-800 text-white hover:bg-red-900 mt-6"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
