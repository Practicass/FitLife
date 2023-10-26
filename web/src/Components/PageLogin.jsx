import React from 'react'
import Logo from './Logo'
import useForm from '../hooks/useForm'
import { Global } from '../helpers/Global'
import { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import {useAuth} from '../hooks/useAuth'



const PageLogin = () => {

  const {form,changed} = useForm({})
  const [saved, setSaved] = useState("not_sended")
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

    if(data.status == "success"){
      setSaved("login")
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      authUser()
      
      navigate("/home")

    }else{
      console.log("ERROR")
      setSaved("error")
    }

  }
  return (
    <div className="pageLogin" >
      <Logo />
      <form className='form-login' onSubmit={loginUser}>
        <label>Correo Electronico</label>
        <input type='text' name='email' onChange={changed}></input>
        <label>Contraseña</label>
        <input type='password' name='password' onChange={changed}></input>
        <div>
          <label>¿No tienes una cuenta?</label><NavLink className="goRegister" to="/register"><label>Registrate</label></NavLink>
        </div>
        <input type='submit' value="Inicia Sesion"/>
      </form>
      
    </div>
  )
}

export default PageLogin
