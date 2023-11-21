import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'

import Historial from './Historial'

const PageHistory = () => {
    const [sidebar, setSidebar] = useState(false)
    const styleTitle = {
        "fontSize":"60px",
        "color":"#fba92c", 
        "fontWeight":"bolder",
        "marginLeft": "100px"
    }

  return (
    <div className={"page-"+sidebar}>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
      <div className='content'>
        <Header/>
        <h1 style={styleTitle}>HISTORIAL</h1>
        <div className='history-page-content'>  
          <Historial />
        </div>
      </div>
    </div>
  )
}

export default PageHistory
