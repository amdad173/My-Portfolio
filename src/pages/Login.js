import React, { useEffect, useState } from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import auth from '../config/firebase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ProfileLayout from '../components/Layout/ProfileLayout'


const Login = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("please sign in");
  const [user] = useAuth()

  async function register(e) {
    e.preventDefault();

    try{
      await createUserWithEmailAndPassword(auth, name, password);
      setMessage("signup successfully")
    }catch(error){
      console.log(error)
      setMessage("Something went wrong")  //error obeject has name and message property
    }
  }

  async function login(e) {
    e.preventDefault();

    try{
      await signInWithEmailAndPassword(auth, name, password);
      setMessage("signup successfully")
      navigate("/admin/profile")
    }catch(error){
      console.log(error)
      setMessage("Something went wrong")
    }
  }

  //if already loged in then no need to login
  useEffect(()=>{
    user && navigate("/admin/profile")
  },[user, navigate])
  
  return (
    <ProfileLayout>
        <p>{user? user?.email+" "+message : message}</p>
        <form>
          <input 
            type="text" 
            placeholder='User Name'
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />
          <input 
            type="password" 
            placeholder='User Name'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />
          <button onClick={register}>sign in</button>
          <button onClick={login}>Login</button>
        </form>
    </ProfileLayout>
  )
}

export default Login