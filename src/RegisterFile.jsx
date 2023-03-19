import React, { useState } from 'react';
import axios from 'axios';

const RegisterFile = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/register', user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2 className='name'>REGISTER</h2>
      <div className='box'>

        <form onSubmit={handleSubmit}>

          <div className="table">
            <label>Name:</label>
            <input type="text" placeholder='Write your name' name="name" value={user.name} onChange={handleChange} />
          </div>
          <div className="table">
            <label>Email:</label>
            <input type="email" placeholder='Write Email' name="email" value={user.email} onChange={handleChange} />
          </div>
          <div className="table">
            <label>Password:</label>
            <input type="password" placeholder='Write Password' name="password" value={user.password} onChange={handleChange} />
          </div>
      <button type="submit">Register</button>
    </form>
  </div >
    </div >
  );
};

export default RegisterFile;
