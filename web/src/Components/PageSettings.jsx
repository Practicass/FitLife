import  { useEffect, useState } from "react";
import "../css/PageSettings.css"
import Logo from "./Logo";
import {FaCheck} from "react-icons/fa"
import {ImCross} from "react-icons/im"
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {FaUserCircle} from "react-icons/fa"
import { MyButton } from "./MyButton";
import { Global } from '../helpers/Global'



 const PageSettings = () => {
    const {auth,authUser} = useAuth()
    const navigate = useNavigate()
    

    

    
    
    
 
    const [inputValue1, setInputValue1] = useState('') //useState(auth.email)
    const [inputValue2, setInputValue2] = useState('') //useState(auth.nick)
    const [inputValue3, setInputValue3] = useState('') 
    const [errorGeneral, setErrorGeneral] = useState(0)
    const [errorInput1, setErrorInput1] = useState(0)
    const [errorInput2, setErrorInput2] = useState(0)
    const [errorInput3, setErrorInput3] = useState(0)

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
    useEffect(()=>{
      if(auth.email !== undefined){
        setInputValue1(auth.email)
        setInputValue2(auth.nick)
       
      }else{
        setInputValue1("")
        setInputValue2("")
      }
     
    },[auth])


    const updateUser = async(e) => {
      // Para que no se recargue la pagina
      e.preventDefault();

      
      const cambios = {
        email: inputValue1,
        nick: inputValue2
      }
      
      const request = await fetch(Global.url+"user/update", {
      method: "PUT",
      body: JSON.stringify(cambios),
      headers: {
          "Content-Type":"application/json",
          "Authorization": localStorage.getItem("token")
      }
      })

      const data = await request.json()

      //console.log(data)

      if(data.status == "success"){
          setErrorInput1(0)
          setErrorInput2(false)
        // localStorage.setItem("user", JSON.stringify(data.user._id));
          authUser()
      } else if (data.message === "El usuario ya existe"){
        //console.log("ERROR")
          setErrorInput1(2)
      }
      return data.status
  }

  const updateUserPassword = async(e) => {
    // Para que no se recargue la pagina
    e.preventDefault();

    
    const cambio = {
      password: inputValue3,
      email: inputValue1,
    }
    const request = await fetch(Global.url+"user/update", {
    method: "PUT",
    body: JSON.stringify(cambio),
    headers: {
        "Content-Type":"application/json",
        "Authorization": localStorage.getItem("token")
    }
    })

    const data = await request.json()

    console.log(data)

    if(data.status === "success"){
        authUser()
    } else if (data.message === "El usuario ya existe") {
      return "success"
    }
    return data.status
}

const update = async(e) => {

  // //console.log("dentro")
  let resultUser 
  let resultPasswd

  if (inputValue1 === "") {
    setErrorInput1(1)
    if (inputValue2 === "") {
      setErrorInput2(1)
    } else {
      setErrorInput2(0)
    }
  } else if (inputValue2 === "") {
    setErrorInput1(0)
    setErrorInput2(1)
  } else {
    setErrorInput1(0)
    setErrorInput2(0)

    if (auth.email !== inputValue1 || auth.nick !== inputValue2) {
      resultUser = updateUser(e)
    } else {
      resultUser = "success"
    }
  }

  if (inputValue3 !== "") {
    setErrorInput3(0)
    resultPasswd = await updateUserPassword(e)
  } else {
    setErrorInput3(1)
    resultPasswd = "error"
  }
  console.log("resultUser: ", resultUser)
  console.log("resultPasswd: ", resultPasswd)

  if (resultUser === "success" && resultPasswd === "success") {
    setErrorGeneral(0)
    navigate("/profile")
  }
  else if (resultUser !== "success" && resultPasswd !== "success") {
    setErrorGeneral(0)
  }
  else if (resultUser !== "success" && resultPasswd === "success") {
    setErrorGeneral(1)
  }
  else { // resultUser === "success" && resultPasswd !== "success"
    setErrorGeneral(2)
  }
}
    

    const styleTitle = {
        "fontSize":"60px",
        "color":"#fba92c", 
        "fontWeight":"bolder",
        "marginLeft": "100px"
    }
    const styleError = {
      "color": "red",
      "fontWeight": "bold", 
      "marginBottom": "1%"}
    
  return(
    <div className="settings-page">

        <div className="header-settings">


                <div className="logo-settings">
                <Logo />
                </div>

            <NavLink to={-1}><ImCross className="cross-settings"size="35px" color='#fba92c'/></NavLink>
            {/* Call update to change the user's value */}
              <MyButton size="xs" type="submit" onClick={update}>
              <FaCheck className="check-settings" color='#fba92c' size="50px"/>
              </MyButton>
        </div>
        <div className="principal-settings">
            <h1 style={styleTitle}>MI PERFIL</h1>
            {/* Call upload to change the user's img */}
            <center><div className="settings-square">
            {auth.image == "default.png" ? 
              <FaUserCircle className= "settings-img"color='#fba92c' size="100px" stroke="0"/> 
          : <img className="settings-img"src={auth.imagen}/>}</div></center>

            <h1 className="settings-co">Correo electrónico:</h1>
            <h1 className="settings-nm">Nombre de usuario:</h1>
            <h1 className="settings-psw">Contraseña:</h1> 
            { errorGeneral == 1 ? (
              <p
                style={styleError}>
                Se ha actualizado la contraseña pero el correo electrónico y el nombre de usuario no
              </p>
            ) : errorGeneral == 2 ? (
              <p
                style={styleError}>
                Se han actualizado el correo electrónico y el nombre de usuario pero la contraseña no
              </p>
            ) : (
              null
            )}

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
                  className="settings-inp3"/>
            </form>
            <div className="errores-settings">
              {/* Correo electrónico */}
              <div className="error-inp1">
              { errorInput1 == 1 ? (
                <p style={styleError}> 
                  No se ha podido actualizar su perfil ya que no ha introducido un correo electrónico 
                </p>
              ) : errorInput1 == 2 ? (
                <p style={styleError}> 
                  Su nombre de usuario y/o correo electrónico ya están en uso 
                </p>
              ) : (
                null
              )}
              </div>

              {/* Nombre de usuario */}
              <div className="error-inp2">
              { errorInput2 == 1 ? (
                <p style={styleError}> 
                  No se ha podido actualizar su perfil ya que no ha introducido un nombre de usuario 
                </p>
              ) : (
                null
              )}
              </div>

              {/* Contraseña */}
              <div className="error-inp3">
              { errorInput3 == 1 ? (
                <p 
                  style={styleError}> 
                  Su contraseña debe tener 1 o mas carácteres
                </p>
              ) : (
                null
              )}
              </div>
            </div>
        
        </div>
    </div>
  )

};


export default PageSettings;
