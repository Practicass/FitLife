import React from "react"

const RegisterForm3 = ({form,changed}) => {
    return (
    <div className='registerForm'>
        <form name='form-register1'> 
            <p>Nombre de usuario</p>
            <input type='text' name='nick' defaultValue={form.nick} onChange={changed}/>
            <p>Contraseña</p>
            <input type='password' name='password' defaultValue={form.password} onChange={changed}/>
        </form>
    </div>
)
}

export default RegisterForm3
