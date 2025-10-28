import axios from "axios";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const User = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
const navigate= useNavigate()
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:4000/user/Register", user);
      alert(res.data.message);
      navigate('/login')
      setUser({
        userName: "",
        email: "",
        password: "",
      });h
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-blue-700 border border-green-700 h-screen text-white">
      <Navbar/>
      <div className="w-[30%] border border-white h-95 ml-[35%] mt-[5%] rounded-lg p-4">
        <div className="flex justify-center mt-2">
          <FaUserCircle className="w-16 h-16 rounded-full" />
        </div>

        <div className="flex justify-center items-center gap-3 w-full mt-10">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={user.email}
            placeholder="email"
            onChange={handleChange}
            className="w-full h-10 mr-3 bg-gray-300 mt-4 text-black rounded-md shadow-2xs cursor-pointer"
          />
        </div>

        <div className="flex justify-center items-center gap-3 w-full">
          <label>Name:</label>
          <input
            type="text"
            name="userName"
            value={user.userName}
            placeholder="Name"
            onChange={handleChange}
            className="w-full h-10 mr-3 bg-gray-300 mt-4 text-black rounded-md shadow-2xs cursor-pointer"
          />
        </div>

        <div className="flex justify-center items-center gap-3 w-full">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="password"
            onChange={handleChange}
            className="w-full mr-3 h-10 bg-gray-300 mt-4 text-black rounded-md shadow-2xs cursor-pointer"
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="h-10 w-[30%] rounded-full bg-red-800 text-white hover:bg-red-900"
          ><Link to='/login'>Sinup</Link>
          </button>
          <button
            onClick={handleSubmit}
            className="h-10 w-[30%] rounded-full bg-red-800 text-white hover:bg-red-900"
          ><Link to ='/login'>login</Link>
          </button>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default User;
