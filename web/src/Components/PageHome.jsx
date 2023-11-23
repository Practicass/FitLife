import React, { useEffect } from 'react'
import Header from './Header'
import {FaBars} from "react-icons/fa"

import { useState } from 'react'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'
import Feed from './Feed'

const PageHome = () => {

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
        <div className='principal-feed'>
          <Feed/>
        </div>
      </div>
    </div>
  ) 
}

export default PageHome
