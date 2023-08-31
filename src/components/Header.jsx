import {  Link, NavLink } from "react-router-dom"
import icon from "../assets/images/avatar-icon.png"
import { fakeLogOut } from "../../utils"
export default function Header(){
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    return (
        <header>

           <Link to="/" className="site-logo">#VANLIFE</Link>
       <nav className="nav-bar">
           <NavLink 
           to="host" 
           style={ ({isActive}) => isActive ? activeStyles : null }
            >Host</NavLink>
           <NavLink 
           to="about"
           style={ ({isActive}) => isActive ? activeStyles : null }
           >About
           </NavLink>
           <NavLink 
           to="vans"
           style={ ({isActive}) => isActive ? activeStyles : null }
           >Vans</NavLink>
           <NavLink 
           to="login"
           style={ ({isActive}) => isActive ? activeStyles : null }
           >
            <img src={icon} alt="login" />
           </NavLink>
           <button className="log-out" onClick={fakeLogOut}>Log Out</button>
       </nav>
        </header>
    )
}