import React from "react"
import { useState } from 'react'
import { useEffect } from 'react'
import Sidebar from "./Sidebar"
import Header from "./Header"
import { Link } from 'react-router-dom'
// import { useNuevaRutinaContext } from "./NuevaRutinaContext"
import "../css/PageNuevaRutina.css"
import { MyButton } from './MyButton'


const PageNuevaRutina = () => {
    const[sidebar,setSidebar] = useState(false)


    return (
        <div className={"page-"+sidebar}>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <div className='content'>
                <Header/>
                <div className="principal">
                    <div className="titulo-boton">
                        <h1 className="nueva-rutina"> NUEVA RUTINA </h1>
                        <Link to="/routines">
                            <MyButton className="boton-anadir" color="orangeblack" size="xxl" type="submit" value="Añadir">Añadir</MyButton>
                        </Link>
                    </div>
                    <div className="div-form-nombre-rutina">
                        <p className="nombre-rutina-titulo">NOMBRE DE LA RUTINA</p>
                        <form className="form-nombre-rutina">
                            <input type="text" name="nombre-rutina"/>
                        </form>
                    </div>
                    <div className="div-button-ejercicios">
                        <p className="ejercicios-titulo-boton"> EJERCICIOS </p>
                        <ul>
                            {/* {listaEjercicios.map((ejercicio, index) => (
                                <li key={index}>{ejercicio}</li>
                            ))} */}
                            <li>
                                <Link to={{ pathname: "/exercises"}}>
                                    <MyButton className="boton-ejercicio"
                                            color="lightGrey"
                                            size="xxl" 
                                            type="submit" 
                                            value="+">
                                        +
                                    </MyButton>
                                </Link>
                            </li>
                        </ul>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default PageNuevaRutina
