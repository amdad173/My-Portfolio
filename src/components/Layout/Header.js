import React from 'react'
import {NavLink, Link} from "react-router-dom"
const Header = () => {
  return (
    <nav>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Header