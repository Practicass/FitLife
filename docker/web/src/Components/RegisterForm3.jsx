import React from "react"

const RegisterForm3 = ({errorNick, errorPassword, form, changed}) => {
    const styleError = {"color": "red", "fontWeight": "bold", "marginBottom": "1%"}
    const styleLabel = {"fontWeight": "bold"}
    
    return (
    <div className='registerForm'>
        <form name='form-register1'> 
            <p style={styleLabel}>Nombre de usuario</p>
            { errorNick ? (
                    <p style={styleError}> Campo obligatorio </p>
                ) : (
                    null
                )}

            <input type='text' name='nick' defaultValue={form.nick} onChange={changed}/>
            <p style={styleLabel}>Contraseña</p>
            { errorPassword ? (
                    <p style={styleError}> Campo obligatorio </p>
                ) : (
                    null
                )}

            <input type='password' name='password' defaultValue={form.password} onChange={changed}/>
        </form>
    </div>
)
}

export default RegisterForm3
