import React from 'react'


// Formulario de la primera pagina de Registro de usuarios
const RegisterForm1 = (changed) => {

    console.log(changed)


    return (
        <div className='registerForm'>
            <form name='form-register1' > 
                <p> Nombre </p>
                <input type='text' name='nombre' onChange={changed.changed}/>
                <p> Apellidos </p>
                <input type='text' name='apellidos' onChange={changed.changed}/>
                <p> Correo electrónico </p>
                <input type='text' name='email' onChange={changed.changed}/>
            </form>
        </div>
    )
}

export default RegisterForm1
