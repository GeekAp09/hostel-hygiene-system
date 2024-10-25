import React, { useState } from 'react'
import './Login.module.css'
import hostel from "../../public/hostel.svg"

const Login = () => {

    const [user,setUser]= useState("student")
  return (
  <>
  
  <div className="main-wrapper">
  <form className="form">
    <img src={hostel} style={{"maxHeight":"90px","marginBottom":"30px"}}/>
    <p className="title">Login </p>
    <p className="message">Login for availing your services</p>
            
    <label>
        <input required="" placeholder="" type="email" className="input"/>
        <span>Email</span>
    </label> 
        
    <label>
        <input required="" placeholder="" type="password" className="input"/>
        <span>Password</span>
    </label>
    <button className="submit">Submit</button>
    <p className="signin">Forgot Your Password ? <a href="#">Reset Password</a> </p>
</form>
</div>
    </>
  )
}

export default Login