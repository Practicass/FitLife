import React, { useEffect } from 'react'
import Logo from './Logo'

import { useState } from 'react'
import {Global} from "../helpers/Global"
import {useAuth} from "../hooks/useAuth"
import {FaUserCircle} from "react-icons/fa"
import {NavLink} from "react-router-dom"
import IconDropdown from './IconDropdown'


const Header = () => {

  const {auth} = useAuth()


  return (
    <div className='header'>
      
        
        <Logo/>
        <IconDropdown/>
       
    </div>
  )
}

export default Header
