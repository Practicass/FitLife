
import Logo from './Logo'
import useForm from '../hooks/useForm'
import { Global } from '../helpers/Global'
// import { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import {useAuth} from '../hooks/useAuth'

import { MyButton } from './MyButton'



const PageLogin = () => {

  const {form,changed} = useForm({})
  // const [saved, setSaved] = useState("not_sended")
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
      // setSaved("login")
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      authUser()
      
      navigate("/home")

    }else{
      console.log("ERROR")
      // setSaved("error")
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
        <input type='text' name='email' onChange={changed} style={style1}></input>
        <label style={style3}>Contraseña</label>
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
