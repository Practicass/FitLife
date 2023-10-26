import React from 'react'

// Formulario de la primera pagina de Registro de usuarios
const RegisterForm2 = (changed) => {
    return (
        <div className='registerForm'>
            <form name='form-register2'> 
                <p>Edad</p>
                <input type='text' name='edad' onChange={changed.changed}/>

                <p>Peso (kg)</p>
                <input type='text' name='peso'  onChange={changed.changed}/>
                
                <p>Altura (cm)</p>
                <input type='text' name='altura'  onChange={changed.changed}/>
                
                <p>Sexo</p>
                <input type='radio' name='sexo' value='Hombre' id='campoHombre'/>
                <label >Hombre</label>
                <input type='radio' name='sexo' value='Mujer' id='campoMujer'/>
                <label >Mujer</label>
                <input type='radio' name='sexo' value='Otro' id='campoOtro'/>
                <label >Otro</label>
            </form>
        </div>
    )
}

export default RegisterForm2
