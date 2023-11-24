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

    useEffect(() => {
        //console.log(num)
    }, [num])


    const registerUser = async(e) => {
        // Para que no se recargue la pagina
        e.preventDefault();

        let userToRegister = form;

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
        }else{
            //console.log("ERROR")
            setError(true)
        
        }

    }

    

    return (
        <div className='pageRegister'>
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
                    <RegisterForm1  form={form} changed={changed}/>
                    
                    <NavLink to="/login"><Button style={{"margin":"8px"}} color="warning">Atras</Button></NavLink>
                    <Button color="warning" style={{"margin":"8px"}} onClick={() => setNum(2)}>Siguiente</Button>
                </div>
                
            : num==2 ? 
                <div className='register2' >
                    <RegisterForm2 form={form}  changed={changed}/>
                    <Button color="warning" style={{"margin":"8px"}} onClick={() => setNum(1)}>Atras</Button>
                    <Button color="warning" style={{"margin":"8px"}} onClick={() => setNum(3)}>Siguiente</Button>
                </div>
            :
                <div className='register3'>
                    <RegisterForm3 form={form} changed={changed}/>
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
