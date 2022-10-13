import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Login() {
  const [userLogin, setUserLogin] = useState({email:"", password:""});

 const navigate = useNavigate();
 useEffect(()=>{
  const auth = localStorage.getItem('user');
  if(auth){
    navigate("/")
  }
 },[])
 const handleLogin = (e)=>{
  const name = e.target.name;
  const value = e.target.value;

  setUserLogin({...userLogin, [name]:value})
 }

 const onLogin = async (e)=>{
  e.preventDefault();
  //console.log(userLogin);
  
  let fetchLogin = await fetch(`${process.env.BACKEND_URL}/login`, {
    method:"POST",
    body:JSON.stringify(userLogin),
    headers:{
      "Content-Type":"application/json"
    }
  });
  fetchLogin = await fetchLogin.json();
  //console.log(fetchLogin);
  if(fetchLogin.auth){  
     alert("you have successfully logged in")
     localStorage.setItem("user", JSON.stringify(fetchLogin.user[0]));
     localStorage.setItem("token", JSON.stringify(fetchLogin.auth));
     navigate("/")
  }else{
    alert("invalid email or password")
   
    //console.log("unaible to send user data")
  }
 }
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center" >

          <div className="card card-width">
  
            <div className="card-body">
            <h3 className="text-center"> user login page</h3>
   <div className=" justify-content-center " >
            <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="email" onChange={handleLogin} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password" onChange={handleLogin} className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" onClick={onLogin} className="btn btn-primary">Submit</button>
</form>
</div>
</div>
</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login