
import Logo from './Logo'
import useForm from '../hooks/useForm'
import { Global } from '../helpers/Global'
// import { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import {useAuth} from '../hooks/useAuth'

import { MyButton } from './MyButton'
// import { color } from 'framer-motion'
import { useState } from 'react'



const PageLogin = () => {

  const {form,changed} = useForm({})
  // const [saved, setSaved] = useState("not_sended")
  let navigate = useNavigate()
  const [error, setError] = useState(false)

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
      
      if(data.user.rol =="usuario"){

        navigate("/home")
      }else{
        navigate("/adminHome")
      }

    }else{
      //console.log("ERROR")
      // setSaved("error")
      setError(true)
    }

  }

  const style1 = {"borderRadius": "10px", "height":"35px"}
  const style2 = { "fontSize": "20px", "fontWeight":"bolder"}
  const style3 = { "fontSize": "20px", "marginTop":"5px", "fontWeight":"bolder"}
  const style5 = { "fontSize": "20px", "marginTop":"10px", "fontWeight":"bolder"}
  const style6 = { "fontSize": "15px", "marginTop":"10px", "display":"flex", "flexDirection":"column"}

  return (
    <div className="pageLogin" >
      <Logo />
      <form className='form-login' onSubmit={loginUser}>
        <label style={style2}>Correo Electronico</label>
        <input type='text' name='email' onChange={changed} style={style1}></input>
        <label style={style3}>Contraseña</label>
        <input type='password' name='password' onChange={changed} style={style1} ></input>
        <div style={style6}>
          <div >
            <label >¿No tienes una cuenta?</label><NavLink className="goRegister" to="/register"><label>Registrate</label></NavLink>
          </div>
          
          {/* <h2 >¿Te has olvidado de tu contraseña?</h2> <NavLink className="goRegister" to="/newPassword"><label>Restablecer contraseña</label></NavLink> */}
            {error ?
              <label style={{"color": "red", "fontWeight": "bolder"}}>El email o la contraseña son incorrectos</label>
              :null
            }
        </div>
        <MyButton style={style5} color='orange' type='submit' value="Inicia Sesion">Inicar sesión</MyButton>
      </form>
      
    </div>
  )
}

export default PageLogin
