import React, { useState } from "react";
import Sidebar from './Sidebar'
import Logo from './Logo'
import "../css/PageProfile.css"
import { IoMdSettings } from "react-icons/io";
import {useAuth} from "../hooks/useAuth"
import {FaUserCircle} from "react-icons/fa"
import IconDropdown from "./IconDropdown";
import { MyButton } from "./MyButton";
import Header from "./Header";



 const ProfilePage = () => {
  const [sidebar, setSidebar] = useState(false)
  const {auth} = useAuth()
 
  return (

    

    <div className={"page-profile-"+sidebar}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='header-profile'>
            <Logo />
            <div >
              {/* Add navLink to settings page */}
              <IoMdSettings className="settings-logo" color='#fba92c' size="50px"/>
            </div> 
            <div className=" profile-icon-user">
            {auth.imagen = "default.png" ? 
              <div >
                <FaUserCircle className='default-icon-user' color='#fba92c' size="100px"/> 
              </div>
            : <div>
                <img className='profile-img-user' src={auth.imagen}/>
              </div>}
              <h1 className="username">@username{auth.nick}</h1> {/*No funciona lo de auth. nich, revisar como conseguir el nick*/}
              <p className="friends">AMIGOS</p>
              <p className="friends-num">80</p>{/*No funciona lo de auth. nich, revisar como conseguir el nick*/}
              
            </div>
            
           
        </div>
        

        
    </div>
    


  )
};


export default ProfilePage