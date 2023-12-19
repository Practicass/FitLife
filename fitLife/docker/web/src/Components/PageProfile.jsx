import { useState } from "react";
import Sidebar from './Sidebar'
import Logo from './Logo'
import "../css/PageProfile.css"
import { IoMdSettings } from "react-icons/io";
import {useAuth} from "../hooks/useAuth"
import {FaUserCircle} from "react-icons/fa"
import { Global } from '../helpers/Global'
import { useEffect } from 'react'
import Historial from "./Historial";
import { NavLink } from "react-router-dom";



 const PageProfile = () => {
  const [sidebar, setSidebar] = useState(false)
  const {auth} = useAuth()
  const [friends, setFriends] = useState(0)

 


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
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} className="sideBar"/>
        <div className='profile-content'>
            <div className="header-profile">  
              <Logo />
              <NavLink to="/settings"> <IoMdSettings className="settings-logo" color='#fba92c' size="50px"/></NavLink>
              
            </div>
            <div className="profile-principal">
              {auth.image == "default.png" ? 
                <center><div >
                  <FaUserCircle className='default-icon-user' color='#fba92c' size="100px"/> 
                </div></center>
              : <div>
                  <img className='profile-img-user' src={auth.imagen}/>
                </div>}


              <h1 className="username">@{auth.nick}</h1> 
              <p className="friends">AMIGOS</p>
              <p className="friends-num">{friends}</p>{/* Revisar para que muestre el numero de amigos*/}
              <Historial className="hola"/>
            </div>
            
           

        </div>
        

        
    </div>
    


  )
};


export default PageProfile