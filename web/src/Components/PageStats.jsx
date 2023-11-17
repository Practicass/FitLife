
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'
import Stat1 from './Stat1'
import Stat2 from './Stat2'
import Stat3 from './Stat3'
import "../css/PageStats.css"

const PageStats = () => {

    const [sidebar, setSidebar] = useState(false)

  return (
    <div className={"page-"+sidebar}>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
      <div className='content'>
        <Header/>
        <div className='principal-stat'>
            
            <div className={"stat-"+ sidebar}><Stat1/></div>
            <div className={"stat-"+ sidebar}><Stat2/></div>
            <div className={"stat-"+ sidebar}><Stat3/></div>
            
        </div>
      </div>
    </div>
  )
}



export default PageStats
