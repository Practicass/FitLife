import React from 'react'

// Formulario de la primera pagina de Registro de usuarios
const RegisterForm1 = () => {
    return (
        <div className='registerForm'>
            <form name='form-register1'> 
                <p> Nombre </p>
                <input type='text' name='nombre'/>
                <p> Apellidos </p>
                <input type='text' name='apellidos' />
                <p> Correo electrónico </p>
                <input type='text' name='email' />
            </form>
        </div>
    )
}

export default RegisterForm1
