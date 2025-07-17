import React from 'react'
import './home.css'
import itempage from './itempage';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import toast from 'react-hot-toast';
  



export default function Home() {


 const navigate = useNavigate();
 const [role, setRole] = useState('user');

  const Authentication = () => {
   
   
    if (role === 'admin') {
      navigate('/adminpage');
      toast.success("login succesfully");
    } else if (role === 'user') {
      navigate('/itempage');
      toast.success("login succesfully")
    }
  



  };



  return (
    <div id='homepage'>
        <center>

 <div id='login-container'>
    <h3>Login page</h3>
   <select value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="user">User</option>
  <option value="admin">Admin</option>
   </select>
<input type="text" placeholder='username' />
<input type='password' placeholder='password' />
<button placeholder='login' onClick={Authentication}> login </button>

</div>

       </center>s
    </div>
  )
}
