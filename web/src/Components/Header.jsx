import React, { useEffect } from 'react'
import Logo from './Logo'
import {FaBars} from "react-icons/fa"
import { useState } from 'react'
import {Global} from "../helpers/Global"
import {useAuth} from "../hooks/useAuth"
import {FaUserCircle} from "react-icons/fa"
import {NavLink} from "react-router-dom"

const Header = () => {

  const {auth} = useAuth()


  return (
    <div className='header'>
      <div className='icon-bars-menu'>
        <FaBars  size="50px" color='#fba92c'/>
      </div>
        
        <Logo/>
        {auth.imagen = "default.png" ? 
        <div className='icon-user-default'>
          <NavLink to="/me"> <FaUserCircle color='#fba92c' size="50px"/> </NavLink>
        </div>

        
        : <img src={auth.imagen}/>}
       
    </div>
  )
}

export default Header
