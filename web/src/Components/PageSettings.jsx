import React from "react";
import "../css/PageSettings.css"
import Logo from "./Logo";
import {FaCheck} from "react-icons/fa"
import {ImCross} from "react-icons/im"
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {FaUserCircle} from "react-icons/fa"

 const PageSettings = () => {
    const {auth} = useAuth()
    const styleTitle = {
        "fontSize":"60px",
        "color":"#fba92c", 
        "fontWeight":"bolder",
        "marginLeft": "100px"
    }
  return(
    <div>

        <div className="header-settings">


                <div className="logo-settings">
                <Logo />
                </div>

            <NavLink to="/profile"><ImCross className="cross-settings"size="35px" color='#fba92c'/></NavLink>

            <FaCheck className="check-settings" color='#fba92c' size="50px"/>
        </div>
        <div className="principal-settings">
            <h1 style={styleTitle}>MI PERFIL</h1>
            <center><div className="settings-square">
            {auth.imagen = "default.png" ? 
              <FaUserCircle className= "settings-img"color='#fba92c' size="100px" stroke="0"/> 
          : <img className="settings-img"src={auth.imagen}/>}</div></center>
        </div>
    </div>
  )

};


export default PageSettings;
