import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Navabr() {
    const auth = localStorage.getItem('user')
    
    const navigate = useNavigate()
    const logout = ()=>{
      localStorage.clear();
      navigate('/signup')
    }
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-primary navbar-shadow ">
  <div className="container-fluid">
    <h3 className="navbar-brand text-light">Crud Operation</h3>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">

    { auth?<><ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active  text-light" aria-current="page" to="/" >Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link  text-light" to="/add-product">Add Product</Link>
        </li>
        </ul>
        <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link  text-light" onClick={logout} to="/signup">Logout({JSON.parse(auth).name})</Link>
        </li>
        </ul>
         </>:<ul className="navbar-nav ms-auto">
        <li className="nav-item">
        <Link className="nav-link text-light" to="/signup">Signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/login">Login</Link>
        </li>
        </ul>}

{/*show nav item without login*/}

      {/* <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/" >Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add">Features</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/update">Update Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">Profile</Link>
        </li>
        {
          auth?<> <li className="nav-item">
          <Link className="nav-link" onClick={logout} to="/signup">Logout</Link>
        </li></>:<>
        <li className="nav-item">
        <Link className="nav-link" to="/signup">Signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        </>
        }
       
       
      </ul> */}
      

    </div>
  </div>
</nav>
    </>
  )
}

export default Navabr