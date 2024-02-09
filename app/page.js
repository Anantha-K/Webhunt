'use client'
import React, { useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faGithub, faInstagram, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function page() {
  const [activePanel, setActivePanel] = useState('login');
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const handleChange=(e)=>{
    const {name,value}=e.target;
    if(name==='name'){
      setName(value);
    }
    else if(name==='email'){
      setEmail(value)
    }
    else if(name==='password'){
      setPassword(value);
    }
  }
  const handleRegisterClick = () => {
    setActivePanel('register');
  };
  
  const handleLoginClick = () => {
    setActivePanel('login');
  };
  
  const handleSubmit = async (e)=>{
    const data = {name,email,password}
    e.preventDefault();
    setName('');
    setEmail('')
    setPassword('')
    console.log(data);
    const res = await fetch('http://localhost:3000/api/register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data)
    })
    let response = await res.json();
    console.log(response);

  }
 

  return (
    <div className={`container ${activePanel === 'register' ? 'active' : ''}`}>
      <div className="form-container sign-up text-black">
        <form>
          <h1>Sign-up</h1>
          <input type="text" placeholder="Name" value={name} name="name" onChange={handleChange}/>
          <input type="email" placeholder="Email" value={email} name="email" onChange={handleChange}/>
          <input type="password" placeholder="Password" value={password} name="password" onChange={handleChange}/>
          <button onClick={handleSubmit}>Sign Up</button>
          <br />
          <h4>Follow SB Social-media handles</h4>
          {/* <div className="social-icons">
            <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faYoutube} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>

          </div> */}
        </form>
      </div>
      <div className="form-container sign-in text-black">
        <form>
          <h1>Log In</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forget your password?</a>
          <button>Log In</button>
          <br />
          <h4>Follow SB Social-media handles</h4>
          {/* <div className="social-icons">
            <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faYoutube} /></a>
            <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>

          </div> */}
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
<a href="https://ieee-fisat-spectrospect.vercel.app/">
  {/* <img src={process.env.PUBLIC_URL + '/ezgif.gif'} alt="" className="imgg" /> */}
</a>
            <p>Enter your personal details to use all of the site features</p>
            <button className="hidden" onClick={handleLoginClick}>Log In</button>
            <button>Clues</button>
          </div>
          <div className="toggle-panel toggle-right">
            <a href="https://ieee-fisat-spectrospect.vercel.app/"><img src="ezgif.gif" alt="" className="imgg" /></a>
            <p>Register with your personal details to use all of the site features</p>
            <button className="hiddenn" onClick={handleRegisterClick}>Sign Up</button>
            <button>Clues</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;