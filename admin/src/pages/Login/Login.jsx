import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loginUser,reset} from "../../features/auth/authSlice.js";
import { useEffect } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {user,isSuccess} = useSelector((state)=>state.auth);
  const [formData,setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  useEffect(() => {
    if(isSuccess){
      navigate("/dashboard");
      
      dispatch(reset());  
      //important;
    }


  },[isSuccess,user,dispatch,navigate])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
   }

   const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      email,password,
    }

    dispatch(loginUser(dataToSubmit));
    console.log(dataToSubmit);

  }
  return (
    <div className="container">
    <h1 className="heading center">
      <strong>Login</strong></h1>


    <div className="form-wrapper">
    <form 
    onSubmit={handleSubmit}
    >
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
    </div>
  </div>
  )
}

export default Login