import React, { useEffect } from 'react'
import "../../styles/skills.css"

const SkillsList = ({frontend, backend, tools, learning}) => {
  
    // card sliding animation using css and intersection observer
    useEffect(()=>{
      const cards = document.querySelectorAll(".skill-card")

      const observer = new IntersectionObserver(entries=> {
        entries.forEach(entry => {
          entry.target.classList.toggle("show", entry.isIntersecting)
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
          }
        })
      }, {
        threshold: .5,
        rootMargin: "-100px"
      })

      cards.forEach(card => {
        observer.observe(card)
      })

      return () => {
        observer.disconnect();
      };
    },[])


  return (
    <div id='skills' className='container'>
        <h2>MY SKILL'S</h2>
        <div>
          <div className='skill-card left-animation'>
            <h3>FRONTEND DEVELOBMENT</h3>
            <p>
              {frontend.map((item, index)=>{
                return <span key={index}>{item}</span>
              })}
            </p>
          </div>

          <div className='skill-card right-animation'>
            <h3>BACKEND DEVELOBMENT</h3>
            <p>
              {backend.map((item, index)=>{
                return <span key={index}>{item}</span>
              })}
            </p>
          </div>

          <div className='skill-card left-animation'>
            <h3>TOOLS</h3>
            <p>
              {tools.map((item, index)=>{
                return <span key={index}>{item}</span>
              })}
            </p>
          </div>

          <div className='skill-card right-animation'>
            <h3>LEARNING LIST</h3>
            <p>
              {learning.map((item, index)=>{
                return <span key={index}>{item}</span>
              })}
            </p>
          </div>
        </div>
    </div>
  )
}

export default SkillsList