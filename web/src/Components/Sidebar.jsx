import React from 'react'
import { FaBars } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Sidebar = ({sidebar, setSidebar}) => {

    const mostrarSidebar = () => {
        setSidebar(!sidebar)
      }


  return (
    <div className='icon-bars-menu'>
        <FaBars  size="50px" color='#fba92c' onClick={mostrarSidebar}/>
        {sidebar &&
        (<ul className='sidebar'>
                <NavLink to="/history" className="sidebar-options"><li>HISTORIAL</li></NavLink>
                <NavLink to="/friends" className="sidebar-options"><li>AMIGOS</li></NavLink>
                <NavLink to="/rutines" className="sidebar-options"><li>MIS RUTINAS</li></NavLink>
                <NavLink to="/stats" className="sidebar-options"><li>MIS ESTADISTICAS</li></NavLink>
                <NavLink to="/salud" className="sidebar-options"><li>DATOS SALUD</li></NavLink>
        </ul>
        )}
    
    </div> 
  )
}

export default Sidebar
