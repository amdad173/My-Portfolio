import React, { useEffect, useState } from 'react'
import "./waiting.css"
const Waiting = () => {
    const [count, setCount]  = useState(0)
    const [message, setMessage] = useState("")
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCount((preValue)=> preValue+1)
      }, 1000);
      
      if (count === 1)  setMessage("Hi")
      if (count === 2)  setMessage("I am Amdad")
      if (count === 3)  setMessage("Welcome to My Portfolio")

      if(count === 10) {
        setMessage("I Think You Have a Internet Problem")
        clearInterval(interval)
      }



      return () => {
        clearInterval(interval)
      }
    }, [count])
    
    return (
      <div className='waiting'>
        
            <div>{count}</div>
            <h4>{message}</h4>
        
      </div>
    )
}

export default Waiting