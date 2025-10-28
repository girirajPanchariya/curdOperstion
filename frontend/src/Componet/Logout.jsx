import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

const nevigate = useNavigate()

const handlelogout = async()=>{
        const res = await axios.post('http://localhost:4000/user/Logout',)   
            const remiove =  localStorage.removeItem('token',res.data.token)
            if(remiove){
                nevigate('/')
            }else{
                alert(res.data.message || 'logout succefully')
                nevigate('/login')
            }
}   
    return (

    <div>
      <button className=' border border-red-600 w-[120%] h-10 bg-red-600 rounded-2xl font-bold' onClick={handlelogout}>Logout</button>
    </div>
  )
}

export default Logout
