import React, { useEffect } from 'react'
import Header from './Header'
import {FaBars} from "react-icons/fa"

import { useState } from 'react'
import Sidebar from './Sidebar'
import { NavLink, useNavigate } from 'react-router-dom'
import Feed from './Feed'
import { IoSearch } from "react-icons/io5";

const PageFeed = () => {

  const [sidebar, setSidebar] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/")
    }
  })
  

  //console.log(auth)
  return (
    <div className={"page-"+sidebar}>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
      <div className='content'>
        <Header/>
        <NavLink to="/listfriends" className='buscar-usuario'>
          <IoSearch size="30px" color='#fba92c' />
        </NavLink>
        <div className='principal-feed'>
          <Feed/>
        </div>
      </div>
    </div>
  ) 
}

export default PageFeed
