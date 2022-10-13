import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

function Signup() {
    const [signupData, setSignupData] = useState({ name:"",email:"", password:""})

    const navigate = useNavigate()

    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
          navigate("/")
        }
      })

    const handleSignupData = (e) => {
       
        const name = e.target.name;
        const value = e.target.value;
        

        setSignupData({...signupData, [name]:value})
    }

    const SubmitData = async(e)=>{
        e.preventDefault();
       // console.log(signupData)
        let fetchData = await fetch(`${process.env.BACKEND_URL}/signup`, {
            method:"POST",
            body:JSON.stringify(signupData),
            headers:{
               "Content-Type":"application/json"
            }
        });
        fetchData = await fetchData.json();
       
        if(fetchData){
            console.log("data successfully send")
           // console.log(fetchData)
            localStorage.setItem("user", JSON.stringify(fetchData.saveDbUser))
            localStorage.setItem("token", JSON.stringify(fetchData.auth))
            
            navigate('/')
        }else{
            alert("process failed")
        }
    }

  return (
    <>
        <div  className="container">
            <div  className="row">
                <div  className="col-md-12 d-flex justify-content-center">

                <div className="card card-width">
                <h3>Signup</h3>
                <div className="card-body">

                <form  >
                <div  >
               <label htmlFor="name"  className="form-label">Name</label>
               <input type="text" name="name"  onChange={handleSignupData} className="form-control" id="inputText" />
            </div>
             <div  >
               <label htmlFor="Email"  className="form-label">Email</label>
               <input type="email" name="email"  onChange={handleSignupData}   className="form-control" id="inputEmail4" />
            </div>
             <div >
                  <label htmlFor="password"  className="form-label">Password</label>
                  <input type="password"  name="password"  onChange={handleSignupData}  className="form-control" />
            </div>
            <div className='mt-2'>
                <input type="submit" onClick={SubmitData} className='btn btn-success' />
            </div>
         </form>
         </div>
         </div>
                </div>

            </div>

        </div>
    </>
  )
}

export default Signup