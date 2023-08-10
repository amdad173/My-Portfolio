import React, { useEffect } from 'react'
import "../../styles/education.css"
const Education = () => {
  // card sliding animation using css and intersection observer
  useEffect(()=>{
    const cards1 = document.querySelectorAll(".edu-animation")

    const observer1 = new IntersectionObserver(entries=> {
      let i = 1;
      entries.forEach(entry => {
        entry.target.classList.toggle(`edu-show${i++}`, entry.isIntersecting)
        // console.log(entry.target)
        if (entry?.isIntersecting) {
          observer1.unobserve(entry.target)
          // console.log("unobserve")
        }
      })
    }, 
    {
      threshold: .5,
      rootMargin: "-100px"
    }
    )

    cards1.forEach(card => {
      observer1.observe(card)
    })

    return () => {
      observer1.disconnect();
    };
  },[])

  return (
    <div id='education' className='container'>
      <h2>EDUCATION</h2>
      <div>
        <div>
          <h4>2022</h4>
          <h3>B.Sc in CSE</h3>
          <p>International Islamic University Chittagong</p>
        </div>
        <div className='edu-animation'>
          <h4>2016</h4>
          <h3>HSC in Science</h3>
          <p>Chattagram Biggan Collage</p>
        </div>
        <div className='edu-animation'>
          <h4>2014</h4>
          <h3>SSC in Science</h3>
          <p>Hazi Abdul Ali City Corporation High School</p>
        </div>
      </div>
    </div>
  )
}

export default Education