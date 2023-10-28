import React, { useState } from "react";
import Sidebar from './Sidebar'
import Logo from './Logo'
import "../css/PageProfile.css"
import { IoMdSettings } from "react-icons/io";
import {useAuth} from "../hooks/useAuth"
import {FaUserCircle} from "react-icons/fa"
import IconDropdown from "./IconDropdown";



 const ProfilePage = () => {
  const [sidebar, setSidebar] = useState(false)
  const {auth} = useAuth()
  return (

    <div className={"page-"+sidebar}>
      <Sidebar className="sidebar"sidebar={sidebar} setSidebar={setSidebar}/>
      <div className="content">
      
      <div className='header-profile'>
          <Logo />
         <div className="settings-logo">
          <IoMdSettings color='#fba92c' size="50px"/>
          </div>
      </div>
      <div className=" profile-icon-user">
        {auth.imagen = "default.png" ? 
        <div className='default-icon-user'>
           <FaUserCircle color='#fba92c' size="50px"/> 
        </div>

        
        :  <div>
            <img src={auth.imagen}/>
          </div>}
      </div>
      <div>

      </div>
          
     
  </div>
      

    </div>

  )
};


export default ProfilePage