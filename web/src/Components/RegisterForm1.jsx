import React from 'react'


// Formulario de la primera pagina de Registro de usuarios
const RegisterForm1 = ({form,changed}) => {


    return (
        <div className='registerForm'>
            <form name='form-register1' > 
                <p> Nombre </p>
                <input type='text' name='name' defaultValue={form.name} onChange={changed} />
                <p> Apellidos </p>
                <input type='text' name='surname' defaultValue={form.surname} onChange={changed}/>
                <p> Correo electrónico </p>
                <input type='text' name='email' defaultValue={form.email} onChange={changed}/>
            </form>
        </div>
    )
}

export default RegisterForm1
