import React, { useEffect, useState } from 'react'
import RegisterForm1 from './RegisterForm1'
import RegisterForm2 from './RegisterForm2'
import RegisterForm3 from './RegisterForm3'
import useForm from '../hooks/useForm'


const PageRegister = () => {

    const [num, setNum] = useState(1)
    const {form, changed} = useForm({})

    useEffect(() => {
        console.log(num)
    }, [num])


    const registerUser = async(e) => {
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
        setSaved("login")
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        authUser()
        
        navigate("/home")

        }else{
        console.log("ERROR")
        setSaved("error")
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
                    <RegisterForm1 changed={changed}/>
                    <button>Atras</button>
                    <button onClick={e => setNum(2)}>Siguiente</button>
                </div>
                
            : num==2 ? 
                <div className='register2' >
                    <RegisterForm2 changed={changed}/>
                    <button onClick={e => setNum(1)}>Atras</button>
                    <button onClick={e => setNum(3)}>Siguiente</button>
                </div>
            :
                <div className='register3'>
                    <RegisterForm3 changed={changed}/>
                    <button onClick={e => setNum(2)}>Atras</button>
                    <button type='submit' onClick={registerUser}>Registrarse</button>
                </div>
            }
        </div>
    )
}

export default PageRegister
