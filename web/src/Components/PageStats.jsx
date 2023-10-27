import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'
import "../css/PageStats.css"

const PageStats = () => {

    const [sidebar, setSidebar] = useState(false)

  return (
    <div className={"page-"+sidebar}>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
      <div className='content'>
        <Header/>
        <div className='principal'>
            <div className={"stat-"+ sidebar}></div>
            <div className={"stat-"+ sidebar}></div>
            <div className={"stat-"+ sidebar}></div>
        </div>
      </div>
    </div>
  )
}

export default PageStats
