import React from 'react'
import {NavLink, Link} from "react-router-dom"
const Header = () => {
  return (
    <nav>
        <ul>
            <li>
                <NavLink to="#intro">Home</NavLink>
            </li>
            <li>
                <NavLink to="#education">Education</NavLink>
            </li>
            <li>
                <NavLink to="#skills">Skill's</NavLink>
            </li>
            <li>
                <NavLink to="#projects">Project's</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Header