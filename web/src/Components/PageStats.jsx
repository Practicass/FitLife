
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'
import Stat1 from './Stat1'
import Stat2 from './Stat2'
import Stat3 from './Stat3'
import "../css/PageStats.css"
import { NavLink } from 'react-router-dom'

const PageStats = () => {

    const [sidebar, setSidebar] = useState(false)

  return (
    <div className={"page-"+sidebar}>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
      <div className='content'>
        <Header/>
        <div className='principal-stat'>
            
            <NavLink to="/stats/1" className="stats"><Stat1/></NavLink>
            <NavLink to="/stats/2" className="stats"><Stat2/></NavLink>
            <NavLink to="/stats/3" className="stats"><Stat3/></NavLink>
            
        </div>
      </div>
    </div>
  )
}



export default PageStats
