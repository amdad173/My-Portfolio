import React from 'react'
import {NavLink, Link} from "react-router-dom"
import auth from '../../config/firebase'
import {signOut} from 'firebase/auth'
import { useAuth } from '../../context/AuthContext'



const Manu = () => {
  const [user, setUser] = useAuth();

  const logout = async ()=>{
    try{
      await signOut(auth);
      setUser({})
    }catch(error){
      console.loge(error.message)
    }
  }
  return (
    <nav>
      <p>{user?.email}</p>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <Link to="/admin/profile">Profile</Link>
            </li>
            <li>
                <Link to="/admin/projects">Project's</Link>
            </li>
            <li>
                <Link to="/admin/create-project">Create Project</Link>
            </li>
            <li>
                <button onClick={logout}>Logout</button>
            </li>
        </ul>
    </nav>
  )
}

export default Manu