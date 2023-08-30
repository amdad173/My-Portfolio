import React, { useState } from 'react'
import {Link} from "react-router-dom"

const Header = () => {
    const [click, setClick] = useState(false)
  return (
    <nav className='navbar'>
        <Link className='logo' to="/">AH</Link>
        <ul className={click? "nav-manu active":"nav-manu"}>
            <li className='nav-item'>
                <a href="#intro" onClick={()=> setClick(pre => !pre)}>Intro</a>
            </li>
            <li className='nav-item' >
                <a href="#education" onClick={()=> setClick(pre => !pre)}>Education</a>
            </li>
            <li className='nav-item'>
                <a href="#skills" onClick={()=> setClick(pre => !pre)}>Skills</a>
            </li>
            <li className='nav-item'>
                <a href="#projects" onClick={()=> setClick(pre => !pre)}>Projects</a>
            </li>
            <li className='nav-item'>
                <a href="#contact" onClick={()=> setClick(pre => !pre)}>Contact Me</a>
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

export default Header