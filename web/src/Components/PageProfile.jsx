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

    // <div className={"page-profile-"+sidebar}>
    //     <Sidebar className="sidebar"sidebar={sidebar} setSidebar={setSidebar}/>
    //       <div className="content">
      
    //         <div className='header-profile'>
    //           <Logo />
    //             
    //         </div>
    //       <button className=" profile-icon-user">
    //           {auth.imagen = "default.png" ? 
    //             <div >
    //               <FaUserCircle className='default-icon-user' color='#fba92c' size="100px"/> 
    //             </div>
    //           : <div>
    //               <img className='default-img-user' src={auth.imagen}/>
    //             </div>}
    //       </button>
    //     </div>
    //   </div>
    

    <div className={"page-profile-"+sidebar}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='header-profile'>
            <Logo />
            <div className="settings-logo">
              <IoMdSettings color='#fba92c' size="50px"/>
            </div> 
        </div>

        <div className=" profile-icon-user">
            {auth.imagen = "default.png" ? 
              <div >
                <FaUserCircle className='default-icon-user' color='#fba92c' size="100px"/> 
              </div>
            : <div>
                <img className='default-img-user' src={auth.imagen}/>
              </div>}
<<<<<<< Updated upstream
=======
              <h1 className="username">@{auth.nick}</h1> 
              <p className="friends">AMIGOS</p>
              <p className="friends-num">{ }</p>{/* Revisar para que muestre el numero de amigos*/}
              {/* Hacer componente historial y llamarlo aqui */}
            </div>
            
           
>>>>>>> Stashed changes
        </div>
    </div>
    


  )
};


export default ProfilePage