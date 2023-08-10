import React, { useState } from 'react'
import {NavLink, Link} from "react-router-dom"
import auth from '../../config/firebase'
import {signOut} from 'firebase/auth'
import { useAuth } from '../../context/AuthContext'



const Manu = () => {
  const [user, setUser] = useAuth();
  const [click, setClick] = useState(false);

  const logout = async ()=>{
    try{
      await signOut(auth);
      setUser({})
    }catch(error){
      console.loge(error.message)
    }
  }
  return (
    <nav className='navbar'>
      <Link className='logo' to="/">AH</Link>
      <ul className={click? "nav-manu active":"nav-manu"}>
          <li className='nav-item'>
              <NavLink to="/">Home</NavLink>
          </li>
          <li className='nav-item'>
              <Link to="/admin/profile">Profile</Link>
          </li>
          <li className='nav-item'>
              <Link to="/admin/projects">Project's</Link>
          </li>
          <li className='nav-item'>
              <Link to="/admin/create-project">Create Project</Link>
          </li>
          <li className='nav-item'>
              <button onClick={logout}>Logout</button>
          </li>
      </ul>
      <div 
         className={click? "hamburger active":"hamburger"}
         onClick={()=> setClick(pre => !pre)}
         >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>
    </nav>
  )
}

export default Manu