import React from "react"

const RegisterForm3 = () => {
    return (
    <div className='registerForm3'>
        <form name='form-register1'> 
            <p> Nombre de usuario </p>
            <input type='text' name='nickname'/>
            <p> Contraseña </p>
            <input type='password' name='password' />
            <p> Repita la constraseña </p>
            <input type='text' name='passwordRepeat' />
        </form>
    </div>
)
}

export default RegisterForm3
