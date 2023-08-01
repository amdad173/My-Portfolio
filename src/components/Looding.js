import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Looding = () => {
  const [count, setCount]  = useState(3)
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue)=> --preValue)
    }, 1000);
    
    count===0 && navigate("/login")

    return () => {
      clearInterval(interval)
    }
  }, [count, navigate])
  
  return (
    <div>
      <h1>loding.....</h1>
    </div>
  )
}

export default Looding