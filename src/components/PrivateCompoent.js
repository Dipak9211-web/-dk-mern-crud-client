import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
function PrivateCompoent() {
   const auth = localStorage.getItem('user')
  return auth?<Outlet/>:<Navigate to="/signup"/>//means if auth is exist then user can visit all protected route but
                                                //if auth is not available then user will redirect to signup page
}

export default PrivateCompoent