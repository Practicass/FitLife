import { RadioGroup, Radio } from "@nextui-org/react";
// Formulario de la primera pagina de Registro de usuarios
const RegisterForm2 = ({form, changed}) => {
    return (
        <div className='registerForm'>
            <form name='form-register2'> 
                <p>Edad</p>
                <input type='text' name='age' defaultValue={form.age} onChange={changed}/>

                <p>Peso (kg)</p>
                <input type='text' name='weight' defaultValue={form.weight} onChange={changed}/>
                
                <p>Altura (cm)</p>
                <input type='text' name='height' defaultValue={form.height} onChange={changed}/>
                
                <p>Sexo</p>
                <input type='radio' name='sex' value='Hombre' id='campoHombre' checked={form.sex === "Hombre"} onChange={changed}/>
                <label >&nbsp;Hombre&nbsp;&nbsp;</label>
                <input type='radio' name='sex' value='Mujer' id='campoMujer'  checked={form.sex === "Mujer"} onChange={changed}/>
                <label >&nbsp;Mujer&nbsp;&nbsp;</label>
                <input type='radio' name='sex' value='Otro' id='campoOtro'  checked={form.sex === "Otro"} onChange={changed}/>
                <label >&nbsp;Otro&nbsp;&nbsp;</label>
                
            </form>
        </div>
    )
}

export default RegisterForm2
