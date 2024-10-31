import React, { useState } from 'react';
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import "./Login.css"

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [action, setAction] = useState("Sign Up");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (action === 'Sign Up') {
      // Handle Signup logic
      console.log("Signed Up: ", formData);
    } else {
      // Handle Login logic
      console.log("Logged In: ", formData);
    }

    // Assume authentication successful and call onLogin callback
    onLogin();
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="login-body">
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? <div /> : (
          <div className="input">
            <FaRegUser className='icon' />
            <input type="text" name='name' placeholder='Name' value={formData.name} onChange={handleInputChange} />
          </div>
        )}

        <div className="input">
          <MdOutlineMailOutline className='icon' />
          <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleInputChange} />
        </div>

        <div className="input">
          <MdLockOutline className='icon' />
          <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleInputChange} />
        </div>
      </div>

      {action === "Sign Up" ? <div /> : (
        <div className="forgot-password"> Lost Password? <span>Click Here!</span> </div>
      )}

      <div className="submit-container">

      <button className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up"); handleSubmit(); handleClear(); }}>
         Sign Up
       </button>


       <button className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login"); handleSubmit(); handleClear(); }}>
         Login
       </button>
        
      </div>

      {/* <button className="submit" onClick={handleSubmit}>
        {action}
      </button> */}
    </div>
    </div>
  );
}