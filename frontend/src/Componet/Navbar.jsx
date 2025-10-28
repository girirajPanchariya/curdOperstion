import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = () => {
  return (
    <div className='w-full bg-gray-700 h-20 flex justify-between items-center shadow px-5'>
      <div className='w-[10%] h-full flex items-center'>
        <h1 className='font-bold text-zinc-200'><Link to={'/'}>LOGO</Link></h1>
      </div>
      <div className='w-[50%] h-full'>
        <ul className='flex gap-6 list-none justify-between items-center w-full h-full text-zinc-200 font-medium'>
          <li className='cursor-pointer'><Link to='/User'>Home</Link></li>
          <li className='cursor-pointer'><Link to='/about'>About</Link></li>
          <li className='cursor-pointer'><Link to='/contact'>Contact</Link></li>
          <li className='cursor-pointer'><Link to='/Mydata'>Alluser</Link></li>
          <Logout/>
          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
