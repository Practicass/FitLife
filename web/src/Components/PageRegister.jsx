import React, { useEffect, useState } from 'react'
import RegisterForm1 from './RegisterForm1'
import RegisterForm2 from './RegisterForm2'
import RegisterForm3 from './RegisterForm3'
import useForm from '../hooks/useForm'
import { Global } from '../helpers/Global'
import { NavLink, useNavigate } from 'react-router-dom'


const PageRegister = () => {

    const [num, setNum] = useState(1)
    const {form, changed} = useForm({})
    const navigate = useNavigate()

    useEffect(() => {
        console.log(num)
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

        console.log(data)

        if(data.status == "success"){

            navigate("/login")
        }else{
        console.log("ERROR")
        
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
                    <NavLink to="/login"><button>Atras</button></NavLink>
                    <button onClick={e => setNum(2)}>Siguiente</button>
                </div>
                
            : num==2 ? 
                <div className='register2' >
                    <RegisterForm2 form={form}  changed={changed}/>
                    <button onClick={e => setNum(1)}>Atras</button>
                    <button onClick={e => setNum(3)}>Siguiente</button>
                </div>
            :
                <div className='register3'>
                    <RegisterForm3 form={form} changed={changed}/>
                    <button onClick={e => setNum(2)}>Atras</button>
                    <button type='submit' onClick={registerUser}>Registrarse</button>
                </div>
            }
        </div>
    )
}

export default PageRegister
