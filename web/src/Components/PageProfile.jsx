import React, { useState } from "react";
import Sidebar from './Sidebar'
import Logo from './Logo'
import "../css/PageProfile.css"
import { IoMdSettings } from "react-icons/io";
import {useAuth} from "../hooks/useAuth"
import {FaUserCircle} from "react-icons/fa"
import { Global } from '../helpers/Global'
import { useEffect } from 'react'
import Historial from "./Historial";



 const ProfilePage = () => {
  const [sidebar, setSidebar] = useState(false)
  const {auth} = useAuth()
  const [friends, setFriends] = useState(0)
  const [id, setId] = useState("")
 


  const getFriends = async() => {

    const request = await fetch(Global.url+"friend/numFriends", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
            
          }
    })

    const data = await request.json()
    setFriends(data.total)    
}

useEffect(() => {
  getFriends()
}, [])  






  return (

   

    <div className={"page-profile-"+sidebar}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='header-profile'>
            <Logo />
            <div >
              {/* Add navLink to settings page */}
              <IoMdSettings className="settings-logo" color='#fba92c' size="50px"/>
            </div> 
            <div className="profile-content">
            {auth.imagen = "default.png" ? 
              <center><div >
                <FaUserCircle className='default-icon-user' color='#fba92c' size="100px"/> 
              </div></center>
            : <div>
                <img className='profile-img-user' src={auth.imagen}/>
              </div>}


              <h1 className="username">@{auth.nick}</h1> 
              <p className="friends">AMIGOS</p>
              <p className="friends-num">{friends}</p>{/* Revisar para que muestre el numero de amigos*/}
              <Historial />
            </div>
            
           

        </div>
        

        
    </div>
    


  )
};


export default ProfilePage