import React from 'react'

// Formulario de la primera pagina de Registro de usuarios
const RegisterForm2 = () => {
    return (
        <div className='registerForm2'>
            <form name='form-register2'> 
                <p> Edad </p>
                <input type='text' name='edad'/>

                <p> Peso (kg) </p>
                <input type='text' name='peso' />
                
                <p> Altura (cm) </p>
                <input type='text' name='altura' />
                
                <p> Sexo </p>
                <input type='radio' name='sexo' value='Hombre' id='campoHombre'/>
                <label for='campoHombre'> Hombre </label>
                <input type='radio' name='sexo' value='Mujer' id='campoMujer'/>
                <label for='campoMujer'> Mujer </label>
                <input type='radio' name='sexo' value='Otro' id='campoOtro'/>
                <label for='campoOtro'> Otro </label>
            </form>
        </div>
    )
}

export default RegisterForm2
