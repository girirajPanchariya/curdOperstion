import React from 'react'
import { useState } from 'react'

const Addreactbook = () => {
 
    const HandleReadBook = async()=>{
                try {
            const response = await axios.post(`http://localhost:4000/user/read/${bookId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message || "An error occurred");
        }
      return (
        <div>
            <h2>Mark a Book as Read</h2>
            <input
                type="text"
                value={bookId}
                onChange={(e) => setBooksId(e.target.value)}
                placeholder="Enter Book ID"
            />
            <button onClick={HandleReadBook}>Add Read Book</button>
            {message && <p>{message}</p>}
        </div>
    );
}
}
export default Addreactbook
