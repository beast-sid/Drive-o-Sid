import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
const Login = (props) => {
    const [credentials,setcredentials]=useState({email:"",password:""});
    let history=useHistory();
    const handleSubmit=async (e)=>{
        e.preventDefault();//prevent the page from reloading
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json();
          console.log(json);
          if(json.success)
          {
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in Successfully","success")
             history.push("/");//redirect to homepage
            
          }
          else
          {
            props.showAlert("Invalid Credentials","danger")
          }
    }
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-5">
            <h2>Login to continue</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3 my-5">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={credentials.email} type="email" className="form-control" id="email" name="email" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={credentials.password} type="password" className="form-control" id="password" name="password" onChange={onChange} required/>
                </div>

                

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
