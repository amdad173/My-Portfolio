import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Loading = () => {
  const [count, setCount]  = useState(3)
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue)=> --preValue)
    }, 1000);
    
    count===0 && navigate("/")

    return () => {
      clearInterval(interval)
    }
  }, [count, navigate])
  
  return (
    <div className='loading'>
      <h1>loding.....</h1>
    </div>
  )
}

export default Loading