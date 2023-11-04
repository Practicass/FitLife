import React, { useEffect, useState } from "react";
import "../css/PageSettings.css"
import Logo from "./Logo";
import {FaCheck} from "react-icons/fa"
import {ImCross} from "react-icons/im"
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {FaUserCircle} from "react-icons/fa"
import { Global } from '../helpers/Global'

 const PageSettings = () => {
    const {auth} = useAuth()


    const getUser = async() => {

      const request = await fetch(Global.url+"user/profile", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")
              
            }
      })
  
      const data = await request.json()
      setFriends(data.total)    
  }
    
    
    
    const [inputValue1, setInputValue1] = useState('')
    const [inputValue2, setInputValue2] = useState('')
    const [inputValue3, setInputValue3] = useState('') 
    const onInputChange1 = ({target}) =>{
        setInputValue1(target.value)
    }
    const onInputChange2 = ({target}) =>{
      setInputValue2(target.value)
      console.log(inputValue2)
  }
  const onInputChange3 = ({target}) =>{
    setInputValue3(target.value)
    
}

    const onSubmit = (event) => {
      
      event.preventDefault();
      
      
      
    }
    useEffect(()=>{
      const {user} = getUser()
     
      // setInputValue1(user.email)
      // setInputValue2(user.nickname)
     
    },[])

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

            <h1 className="settings-co">Correo electrónico:</h1>
            <h1 className="settings-nm">Nombre de usuario:</h1>
            <h1 className="settings-psw">Contraseña:</h1> 
            <form className="settings-form" onSubmit={onSubmit}>
              
            <input 
              type="text"
              
              value={inputValue1}
              onChange={onInputChange1}
              className="settings-inp1"

            
            
            />
            <input 
              type="text"
              
              value={inputValue2}
              onChange={onInputChange2}
              className="settings-inp2"
              

            
            
            />
            <input 
              type="password"
              
              value={inputValue3}
              onChange={onInputChange3}
              className="settings-inp3"

            
            
            />


            </form>

        </div>
    </div>
  )

};


export default PageSettings;
