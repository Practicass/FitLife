import React from 'react'
import Logo from './Logo'
import useForm from '../hooks/useForm'
import { Global } from '../helpers/Global'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'



const PageLogin = () => {

  const {form,changed} = useForm({})
  const [saved, setSaved] = useState("not_sended")

  const {setAuth} = useAuth()

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

    console.log(data)

    if(data.status == "success"){
      setSaved("login")
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      
      setAuth(data.user);

      
      console.log("GUAI")

    }else{
      console.log("ERROR")
      setSaved("error")
    }

  }
  return (
    <div className="pageLogin" >
      <Logo />
      <form className='form-register' onSubmit={loginUser}>
        <p>Correo Electronico</p>
        <input type='text' name='email' onChange={changed}></input>
        <p>Contraseña</p>
        <input type='text' name='password' onChange={changed}></input>
        <input type='submit' value="Inicia Sesion"/>
      </form>
      
    </div>
  )
}

export default PageLogin
