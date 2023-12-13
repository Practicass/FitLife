


// Formulario de la primera pagina de Registro de usuarios
const RegisterForm1 = ({errorName, errorSur, errorEmail, form, changed}) => {

    const styleError = {"color": "red", "fontWeight": "bold", "marginBottom": "1%"}
    const styleLabel = {"fontWeight": "bold"}
    return (
        <div className='registerForm'>
            <form name='form-register1' > 
                <p style={styleLabel}> Nombre </p>
                { errorName ? (
                    <p style={styleError}> Campo obligatorio </p>
                ) : (
                    null
                )}
                <input type='text' name='name' defaultValue={form.name} onChange={changed} />
                
                <p style={styleLabel}> Apellidos </p>
                { errorSur ? (
                    <p style={styleError}> Campo obligatorio </p>
                ) : (
                    null
                )}
                <input type='text' name='surname' defaultValue={form.surname} onChange={changed}/>
                
                <p style={styleLabel}> Correo electrónico </p>
                { errorEmail ? (
                    <p style={styleError}> Campo obligatorio </p>
                ) : (
                    null
                )}
                <input type='text' name='email' defaultValue={form.email} onChange={changed}/>
            </form>
        </div>
    )
}

export default RegisterForm1
