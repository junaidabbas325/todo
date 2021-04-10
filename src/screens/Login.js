import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom'
import { axiosInstance } from '../API/authorizationBearer';

export default function Login(){
  const [signValue, setSignValue] = useState(false)
  const [userinput, setUserSetInput] = useState('')
  const [passinput, setPassSetInput] = useState('')
  const [signInfo, setSignUpInfo] = useState()
  const changeClasses = () => {
    setSignValue(!signValue)
  }
  useEffect(()=>{
    setSignUpInfo({
      username: userinput,
      password: passinput
    })
    
  }, [passinput, userinput])
   const signUpsubmited = async (e) =>{
    e.preventDefault()
    
    
    await axiosInstance.post('auth/signup', signInfo)
    .then(res =>{
      if(res.status === 201){
        setSignValue(!signValue) 
        setUserSetInput('')
        setPassSetInput('')       
      }
      else{
      }
    })
  }
  
  const loginSubmited = async (e) =>{
    
    e.preventDefault()
    
    
    await axiosInstance.post('auth/signin', signInfo)
    .then(res =>{
      if(res.status === 201){
        setUserSetInput('')
        setPassSetInput('') 
        localStorage.setItem('accessToken', res.data.accessToken) 
              
        window.location = process.env.SERVERURL
      }
      else{
      }
    })
  }
  
  
return(
    <div className={signValue ? "container sign-up-mode" : "container"} >
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={(e)=>loginSubmited(e)} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" value={userinput} placeholder="Username"  onChange={(e)=>setUserSetInput(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" value={passinput} placeholder="Password" onChange={(e)=>setPassSetInput(e.target.value)}/>
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <Link to="/" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="/" className="social-icon">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="/" className="social-icon">
                <i className="fab fa-google"></i>
              </Link>
              <Link to="/" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </form>
          <form onSubmit={(e)=>signUpsubmited(e)} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username"  value={userinput} onChange={(e)=>setUserSetInput(e.target.value)} />
            </div>
            {/*<div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
</div>*/}
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={passinput} onChange={(e)=>setPassSetInput(e.target.value)} />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <Link to="/" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="/" className="social-icon">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="/" className="social-icon">
                <i className="fab fa-google"></i>
              </Link>
              <Link to="/" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" id="sign-up-btn" onClick={()=>changeClasses()}>
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" id="sign-in-btn"  onClick={()=>changeClasses()}>
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
)
}