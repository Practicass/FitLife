import  { useEffect, useState } from 'react'
import RegisterForm1 from './RegisterForm1'
import RegisterForm2 from './RegisterForm2'
import RegisterForm3 from './RegisterForm3'
import useForm from '../hooks/useForm'
import { Global } from '../helpers/Global'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button} from "@nextui-org/react";


const PageRegister = () => {

    const [num, setNum] = useState(1)
    const {form, changed} = useForm({})
    const navigate = useNavigate()
    const [error, setError ] = useState(false)
    const [errorName, setErrorName] = useState(false)
    const [errorSurname, setErrorSurname] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorAge, setErrorAge] = useState(false)
    const [errorWeight, setErrorWeight] = useState(false)
    const [errorHeight, setErrorHeight] = useState(false)
    const [errorSex, setErrorSex] = useState(false)
    const [errorNick, setErrorNick] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    
    useEffect(() => {
        //console.log(num)
    }, [num])


    const registerUser = async(e) => {
        // Para que no se recargue la pagina
        e.preventDefault();

        let userToRegister = form;
        let err = false
        if (!userToRegister || !userToRegister.nick || userToRegister.nick === "") {
            err = true
            setErrorNick(true)
        } else {
            setErrorNick(false)
        }
        if (!userToRegister || !userToRegister.password || userToRegister.password === "") {
            err = true
            setErrorPassword(true)
        } else {
            setErrorPassword(false)
        }

        if (!err) {
            const request = await fetch(Global.url+"user/register", {
                method: "POST",
                body: JSON.stringify(userToRegister),
                headers: {
                    "Content-Type":"application/json"
                }
                })
        
            const data = await request.json()
    
            //console.log(data)
    
            if(data.status == "success"){
    
                navigate("/login")
            }else if (data.message === "El usuario ya existe") {
                //console.log("ERROR")
                setError(true)
            }
        }
    }

    const from1to2 = () => {
        let err = false
        let user = form
        if (!user || !user.name || user.name === "") {
            err = true
            setErrorName(true)
        } else {
            setErrorName(false)
        }
        if (!user || !user.surname || user.surname === "") {
            err = true
            setErrorSurname(true)
        } else {
            setErrorSurname(false)
        }
        if (!user || !user.email || user.email === "") {
            err = true
            setErrorEmail(true)
        } else {
            setErrorEmail(false)
        }

        if (!err) {
            setNum(2)
        }
    }

    const from2to3 = () => {
        let err = false
        let user = form
        if (!user || !user.age || user.age === "") {
            err = true
            setErrorAge(true)
        } else {
            setErrorAge(false)
        }
        if (!user || !user.weight || user.weight === "") {
            err = true
            setErrorWeight(true)
        } else {
            setErrorWeight(false)
        }
        if (!user || !user.height || user.height === "") {
            err = true
            setErrorHeight(true)
        } else {
            setErrorHeight(false)
        }
        if (!user || !user.sex || user.sex === "") {
            err = true
            setErrorSex(true)
        } else {
            setErrorSex(false)
        }


        if (!err) {
            setNum(3)
        }
    }

    const styleTitle = {
        "fontSize":"60px",
        "color":"#fba92c", 
        "fontWeight":"bolder",
        "marginBottom": "2%"
    }

    return (
        <div className='pageRegister'>
            <h1 style={styleTitle}> REGISTRARSE </h1>

            <div className='register-bar'>
                <div className={'circle '+(num === 1 ? "circle-true": "")}>
                    <label className='step'>1</label>
                </div>
                <div className='line'></div>
                <div className={'circle '+(num === 2 ? "circle-true": "")}>
                    <label className='step'>2</label>
                </div>
                <div className='line'></div>
                <div className={'circle '+(num === 3 ? "circle-true": "")}>
                    <label className='step'>3</label>
                </div>
            </div>
            {  num == 1 ? 
                <div className='register1'>
                    <RegisterForm1 errorName={errorName}
                                   errorSur={errorSurname}
                                   errorEmail={errorEmail} 
                                   form={form} 
                                   changed={changed}/>
                    
                    <NavLink to="/login"><Button style={{"margin":"8px"}} color="warning">Atras</Button></NavLink>
                    <Button color="warning" style={{"margin":"8px"}} onClick={() => from1to2()}>Siguiente</Button>
                </div>
                
            : num==2 ? 
                <div className='register2' >
                    <RegisterForm2 errorAge={errorAge}
                                   errorHeight={errorHeight}
                                   errorWeight={errorWeight}
                                   errorSex={errorSex}
                                   form={form} 
                                   changed={changed}/>
                    <Button color="warning" style={{"margin":"8px"}} onClick={() => setNum(1)}>Atras</Button>
                    <Button color="warning" style={{"margin":"8px"}} onClick={() => from2to3()}>Siguiente</Button>
                </div>
            :
                <div className='register3'>
                    <RegisterForm3 errorNick={errorNick}
                                   errorPassword={errorPassword}
                                   form={form} 
                                   changed={changed}/>
                    {error ? <label style={{"color":"red", "fontWeight": "bolder"}}>El usuario ya existe</label> : null}
                    <div>
                        <Button color="warning" style={{"margin":"8px"}} onClick={() => setNum(2)}>Atras</Button>
                        <Button color="warning" style={{"margin":"8px"}} type='submit' onClick={registerUser}>Registrarse</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default PageRegister
