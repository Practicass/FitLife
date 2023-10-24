import React from 'react'
import Header from './Header'
import {useAuth} from "../hooks/useAuth"
import {FaBars} from "react-icons/fa"

import { useState } from 'react'
import Sidebar from './Sidebar'

const PageHome = () => {
  const {auth} = useAuth()
  const [sidebar, setSidebar] = useState(false)

  

  //console.log(auth)
  return (
    <div className={"page-"+sidebar}>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
      <div className='content'>
        <Header/>
        <div className='principal'>
          <div className='rectangle'></div>
          <div className='rectangle'></div>
          <div className='rectangle'></div>
        </div>
      </div>
    </div>
  )
}

export default PageHome
