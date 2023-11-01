import React, { useState } from "react";
import Sidebar from './Sidebar'
import Logo from './Logo'
import "../css/PageProfile.css"
import { IoMdSettings } from "react-icons/io";
import {useAuth} from "../hooks/useAuth"
import {FaUserCircle} from "react-icons/fa"
import { Global } from '../helpers/Global'
import { useEffect } from 'react'



 const ProfilePage = () => {
  const [sidebar, setSidebar] = useState(false)
  const {auth} = useAuth()
  const [friends, setFriends] = useState([])
  const [id, setId] = useState("")
 


  const getFriends = async() => {

    const request = await fetch(Global.url+"friend/friends", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
            
          }
    })

    const data = await request.json()
    setFriends(data.friends)    
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
            <div className=" profile-icon-user">
            {auth.imagen = "default.png" ? 
              <div >
                <FaUserCircle className='default-icon-user' color='#fba92c' size="100px"/> 
              </div>
            : <div>
                <img className='profile-img-user' src={auth.imagen}/>
              </div>}
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
              <h1 className="username">@{auth.nick}</h1> 
              <p className="friends">AMIGOS</p>
              <p className="friends-num">{ }</p>{/* Revisar para que muestre el numero de amigos*/}
              {/* Hacer componente historial y llamarlo aqui */}
            </div>
            
           
>>>>>>> Stashed changes
=======
              <h1 className="username">@{auth.nick}</h1> 
              <p className="friends">AMIGOS</p>
              <p className="friends-num">{ }</p>{/* Revisar para que muestre el numero de amigos*/}
              
            </div>
            
           
>>>>>>> 1db3f1d4b4c72f834052c2782b7876dafe4bb8e2
        </div>
        

        
    </div>
    


  )
};


export default ProfilePage