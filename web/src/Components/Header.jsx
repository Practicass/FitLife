import React, { useEffect } from 'react'
import Logo from './Logo'

import { useState } from 'react'
import {Global} from "../helpers/Global"
import {useAuth} from "../hooks/useAuth"
import {FaUserCircle} from "react-icons/fa"
import {NavLink} from "react-router-dom"

const Header = () => {

  const {auth} = useAuth()


  return (
    <div className='header'>
      
        
        <Logo/>
        {auth.imagen = "default.png" ? 
        <div className='icon-user'>
           <FaUserCircle color='#fba92c' size="50px"/> 
        </div>

        
        :  <div>
            <NavLink to="/me"></NavLink><img src={auth.imagen}/>
          </div>}
       
    </div>
  )
}

export default Header
