import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:"", email: "", password: ""});
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();//prevent the page from reloading
    const {name,email,password}=credentials;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success)
    {
      localStorage.setItem('token',json.authtoken);
       history.push("/");//redirect to homepage
       props.showAlert("Account Created Successfully","success")
    }
    else
    {
        props.showAlert("User alreday exist","danger")
    }
  }
  const onChange = (e) => {
    setcredentials({...credentials,[e.target.name]:e.target.value});
  }
  return (
    <div className="my-5">
      <h2>Create an account to continue</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3 my-5">
        <label className="form-label">Your Good Name</label>
        <input type="text" className="form-control" id="name" name="name" onChange={onChange} minLength={5}  required />

      </div>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name="email" onChange={onChange}  required />

      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
      </div>

      

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
  }

export default Signup;
