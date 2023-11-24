import { useState } from "react";
import Sidebar from './Sidebar'
import Logo from './Logo'
import "../css/PageProfile.css"
import { useParams } from 'react-router-dom'

import {FaUserCircle} from "react-icons/fa"
import { Global } from '../helpers/Global'
import { useEffect } from 'react'
import Historial from "./Historial";




 const PageProfileFriends = () => {
  const [sidebar, setSidebar] = useState(false)
  const [profile, setProfile] = useState({})
  const [friends, setFriends] = useState(0)
  const {id} = useParams()
  console.log(id)
 




  const getProfile = async() => {

    const request = await fetch(Global.url+"user/profile/"+id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
            
          }
    })

    const data = await request.json()
    setProfile(data.user) 
    console.log(profile)   
}

  const getFriends = async() => {

    const request = await fetch(Global.url+"friend/numFriends/"+id, {
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
  getFriends(),
  getProfile()
}, [])  






  return (

   

    <div className={"page-profile-"+sidebar}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} className="sideBar"/>
        <div className='profile-content'>
            <div className="header-profile">  
              <Logo />

              
            </div>
            <div className="profile-principal">
              {profile.image == "default.png" ? 
                <center><div >
                  <FaUserCircle className='default-icon-user' color='#fba92c' size="100px"/> 
                </div></center>
              : <div>
                  <img className='profile-img-user' src={profile.imagen}/>
                </div>}


              <h1 className="username">@{profile.nick}</h1> 
              <p className="friends">AMIGOS</p>
              <p className="friends-num">{friends}</p>{/* Revisar para que muestre el numero de amigos*/}
              <Historial className="hola"/>
            </div>
            
           

        </div>
        

        
    </div>
    


  )
};


export default PageProfileFriends