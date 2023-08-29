import React, { useEffect, useRef } from 'react'
import "../../styles/skills.css"

const SkillsList = ({frontend, backend, tools, learning}) => {
  const skillSliderRef = useRef(null);

  useEffect(() => {
    const skillSlider = skillSliderRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('.skill-card');
          children.forEach((child) => {
            child.classList.add('show');
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5, // Adjust this threshold as needed
    });

    if (skillSlider) {
      observer.observe(skillSlider);
    }

    return () => {
      if (skillSlider) {
        observer.unobserve(skillSlider);
      }
    };
  }, []);


  return (
    <div id='skills' className='container'>
        <h2>MY SKILL'S</h2>
        <div className='skill-slider' ref={skillSliderRef}>
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