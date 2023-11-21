import React from 'react'
import Logo from './Logo'
import useForm from '../hooks/useForm'
import { Global } from '../helpers/Global'
import { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import {useAuth} from '../hooks/useAuth'
import { Button } from '@nextui-org/react'
import { MyButton } from './MyButton'



const PageLogin = () => {

  const {form,changed} = useForm({})
  const [saved, setSaved] = useState("not_sended")
  const [errorCorreo, setErrorCorreo] = useState(null)
  const [errorPasswd, setErrorPasswd] = useState(null)

  let navigate = useNavigate()

  const {authUser} = useAuth()

  const loginUser = async(e) => {
    e.preventDefault();

    let userToLogin = form;

    const request = await fetch(Global.url+"user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type":"application/json"
      }
    })

    const data = await request.json()

    //console.log(data)

    if (data.status === "success") {
      setErrorPasswd("")
      setSaved("login")
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      authUser()
      
      navigate("/home")

    } 
    else if (data.message === "La contraseña no es correcta") {
      console.log("ERROR")
      setSaved("error")
      setErrorCorreo("")
      setErrorPasswd("Contraseña incorrecta. Inténtelo de nuevo")
    }
    else if (data.message === "Error en la consulta de usuarios") {
      setErrorPasswd("")
      setErrorCorreo("Correo electrónico incorrecto. Inténtelo de nuevo")
    }
    else { // data.message == "Faltas datos por enviar"
      if (userToLogin.password === "") {
        console.error(userToLogin.password, 2)
        setErrorPasswd("Contraseña incorrecta. Inténtelo de nuevo")
      } else {
        setErrorPasswd("")
      }
      if (userToLogin.email === "") {
        console.error(userToLogin.password, 1)
        setErrorCorreo("Correo electrónico incorrecto. Inténtelo de nuevo")
      } else {
        setErrorCorreo("")
      }
    }

  }

  const style1 = {"borderRadius": "10px", "height":"35px"}
  const style2 = { "fontSize": "20px", "fontWeight":"bolder"}
  const style3 = { "fontSize": "20px", "marginTop":"5px", "fontWeight":"bolder"}
  const style4 = { "fontSize": "15px", "marginTop":"10px"}
  const style5 = { "fontSize": "20px", "marginTop":"10px", "fontWeight":"bolder"}
  return (
    <div className="pageLogin" >
      <Logo />
      <form className='form-login' onSubmit={loginUser}>
        <label style={style2}>Correo Electronico</label>
        {errorCorreo && <div className='error-message' >{errorCorreo}</div>}
        <input type='text' name='email' onChange={changed} style={style1}></input>
        <label style={style3}>Contraseña</label>
        {errorPasswd && <div className='error-message'>{errorPasswd}</div>}
        <input type='password' name='password' onChange={changed} style={style1} ></input>
        <div style={style4}>
          <label >¿No tienes una cuenta?</label><NavLink className="goRegister" to="/register"><label>Registrate</label></NavLink>
        </div>
        <MyButton style={style5} color='orange' type='submit' value="Inicia Sesion">Inicar sesión</MyButton>
      </form>
      
    </div>
  )
}

export default PageLogin
