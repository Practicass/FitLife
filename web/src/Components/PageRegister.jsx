import React, { useEffect, useState } from 'react'
import RegisterForm1 from './RegisterForm1'
import RegisterForm2 from './RegisterForm2'
import RegisterForm3 from './RegisterForm3'

const PageRegister = () => {

    const [num, setNum] = useState(1)

    useEffect(() => {
        console.log(num)
    }, [num])

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
                    <RegisterForm1/>
                    <label>{num}</label>
                    <button>Atras</button>
                    <button onClick={e => setNum(2)}>Siguiente</button>
                </div>
                
            : num==2 ? 
                <div className='register2'>
                    <RegisterForm2/>
                    <label>{num}</label>
                    <button onClick={e => setNum(1)}>Atras</button>
                    <button onClick={e => setNum(3)}>Siguiente</button>
                </div>
            :
                <div className='register3'>
                    <RegisterForm3/>
                    <label>{num}</label>
                    <button onClick={e => setNum(2)}>Atras</button>
                    <button>Siguiente</button>
                </div>
            }
        </div>
    )
}

export default PageRegister
