import React, { useState } from "react";
import "../css/PageSettings.css"
import Logo from "./Logo";
import {FaCheck} from "react-icons/fa"
import {ImCross} from "react-icons/im"
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {FaUserCircle} from "react-icons/fa"

 const PageSettings = () => {
    const {auth} = useAuth()


    const email = "EMAIL"
    const [inputValue, setInputValue] = useState('')    
    const onInputChange = ({target}) =>{
        setInputValue(target.value)
    }

    const onSubmit = (event) => {
      event.preventDefault();
      console.log(inputValue)
      
      
    }


    const styleTitle = {
        "fontSize":"60px",
        "color":"#fba92c", 
        "fontWeight":"bolder",
        "marginLeft": "100px"
    }
  return(
    <div className="settings-page">

        <div className="header-settings">


                <div className="logo-settings">
                <Logo />
                </div>

            <NavLink to="/profile"><ImCross className="cross-settings"size="35px" color='#fba92c'/></NavLink>
            {/* Call update to change the user's value */}
            <NavLink to="/profile"><FaCheck className="check-settings" color='#fba92c' size="50px"/></NavLink>
        </div>
        <div className="principal-settings">
            <h1 style={styleTitle}>MI PERFIL</h1>
            {/* Call upload to change the user's img */}
            <center><div className="settings-square">
            {auth.imagen = "default.png" ? 
              <FaUserCircle className= "settings-img"color='#fba92c' size="100px" stroke="0"/> 
          : <img className="settings-img"src={auth.imagen}/>}</div></center>

            <form className="settings-form" onSubmit={onSubmit}>
            <input 
              type="text"
              placeholder={email}
              value={inputValue}
              onChange={onInputChange}

            
            
            />


            </form>

        </div>
    </div>
  )

};


export default PageSettings;
