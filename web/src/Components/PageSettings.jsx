import React, { useEffect, useLayoutEffect, useState } from "react";
import "../css/PageSettings.css"
import Logo from "./Logo";
import {FaCheck} from "react-icons/fa"
import {ImCross} from "react-icons/im"
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {FaUserCircle} from "react-icons/fa"
import useEffectDiff from "../hooks/useEffectDiff";


 const PageSettings = () => {
    const {auth} = useAuth()


    
    



 
    const [inputValue1, setInputValue1] = useState('') //useState(auth.email)
    const [inputValue2, setInputValue2] = useState('') //useState(auth.nick)
    const [inputValue3, setInputValue3] = useState('') 
    const onInputChange1 = ({target}) =>{
        setInputValue1(target.value)
    }
    const onInputChange2 = ({target}) =>{
      setInputValue2(target.value)

  }
  const onInputChange3 = ({target}) =>{
    setInputValue3(target.value)
    
}

    const onSubmit = (event) => {
      
      event.preventDefault();
      
    }
    useEffectDiff(()=>{
       setInputValue1(auth.email)
       setInputValue2(auth.nick)
     
    },[auth])


    
    

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
        <h1>{auth.name}</h1>
        </div>
    </div>
  )

};


export default PageSettings;
