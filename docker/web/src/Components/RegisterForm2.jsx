
// Formulario de la primera pagina de Registro de usuarios
const RegisterForm2 = ({errorAge, errorWeight, errorHeight, errorSex, form, changed}) => {
    const style = {"accentColor" : "orange"}
    const styleError = {"color": "red", "fontWeight": "bold", "marginBottom": "1%"}
    const styleLabel = {"fontWeight": "bold"}

    return (
        <div className='registerForm'>
            <form name='form-register2'> 
                <p style={styleLabel}>Edad</p>
                { errorAge ? (
                    <p style={styleError}> Campo obligatorio </p>
                ) : (
                    null
                )}

                <input type='text' name='age' defaultValue={form.age} onChange={changed}/>

                <p style={styleLabel}>Peso (kg)</p>
                { errorWeight ? (
                    <p style={styleError}> Campo obligatorio </p>
                ) : (
                    null
                )}

                <input type='text' name='weight' defaultValue={form.weight} onChange={changed}/>
                
                <p style={styleLabel}>Altura (cm)</p>
                { errorHeight ? (
                    <p style={styleError}> Campo obligatorio </p>
                ) : (
                    null
                )}

                <input type='text' name='height' defaultValue={form.height} onChange={changed}/>
                
                 <p style={styleLabel}>Sexo</p>
                 { errorSex ? (
                    <p style={styleError}> Campo obligatorio </p>
                ) : (
                    null
                )}

                <input className="custom-radio" type='radio' name='sex' value='Hombre' id='campoHombre' checked={form.sex === "Hombre"} onChange={changed}/>
                <label >&nbsp;Hombre&nbsp;&nbsp;</label>
                <input className="custom-radio" type='radio' name='sex' value='Mujer' id='campoMujer'  checked={form.sex === "Mujer"} onChange={changed}/>
                <label >&nbsp;Mujer&nbsp;&nbsp;</label>
                <input className="custom-radio" type='radio' name='sex' value='Otro' id='campoOtro'  checked={form.sex === "Otro"} onChange={changed}/>
                <label >&nbsp;Otro&nbsp;&nbsp;</label>
                           
                
            </form>
        </div>
    )
}

export default RegisterForm2
