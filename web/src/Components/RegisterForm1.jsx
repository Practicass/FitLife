


// Formulario de la primera pagina de Registro de usuarios
const RegisterForm1 = ({errorName, errorSur, errorEmail, form, changed}) => {

    const styleError = {"color": "red", "fontWeight": "bold", "marginBottom": "1%"}
    
    return (
        <div className='registerForm'>
            <form name='form-register1' > 
                <p> Nombre </p>
                { errorName ? (
                    <p style={styleError}> Campo obligatorio </p>
                ) : (
                    null
                )}
                <input type='text' name='name' defaultValue={form.name} onChange={changed} />
                
                <p> Apellidos </p>
                { errorSur ? (
                    <p style={styleError}> Campo obligatorio </p>
                ) : (
                    null
                )}
                <input type='text' name='surname' defaultValue={form.surname} onChange={changed}/>
                
                <p> Correo electrónico </p>
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
