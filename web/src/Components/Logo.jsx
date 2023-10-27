import React from 'react'
import { NavLink } from 'react-router-dom'

const Logo = () => {
  return (
    <div className="logo">
        <NavLink to="/home" className ="img-logo"><img className ="img-logo" src="/LogoLetras.png"  alt ="FITLIFE"/></NavLink>
    </div>
  )
}

export default Logo
