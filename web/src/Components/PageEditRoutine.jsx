/* eslint-disable react/prop-types */
import React from "react"
import { useState } from 'react'
import { useEffect } from 'react'
import Header from "./Header"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "../css/PageNuevaRutina.css"
import { ImCross } from "react-icons/im"
import { MyButton } from './MyButton'
import { Global } from "../helpers/Global"


const PageEditRoutine = ({ ejercicios, setEjercicios, idRutina }) => {

    const navigate = useNavigate()

    const [nombreRutina, setNombreRutina] = useState(() => {
        try {
            const storedNombreRutina = localStorage.getItem("nombreRutina")
            return storedNombreRutina ? JSON.parse(storedNombreRutina) : ""
        } catch (error) {
            console.error("Error al analizar JSON desde localStorage: ", error)
            return ""
        }
    })
    
    useEffect(() => {
        const obtenerNombreRutina = async () => {
            try {
                const response = await fetch(Global.url + "rutine/get/${idRutina}")
                const rutina = response.data.rutine
                setNombreRutina(rutina.name)
            } catch (error) {
                console.error("Error al obtener el nombre de la rutina", error)
            }
        }
        obtenerNombreRutina()
    }, [idRutina])

    const eliminarEjercicio = (index) => {
        const newEjercicios = [...ejercicios]
        newEjercicios.splice(index,1)
        localStorage.setItem('ejerciciosEdit', JSON.stringify(newEjercicios))
    }

    const updateRutina = async () => {
        try {
            const response = await fetch(Global.url + "rutine/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    name: nombreRutina,
                    exercises: ejercicios.map(ejercicio => ejercicio._id),
                })
            })

            const data = await response.json()

            if (data.status === "success") {
                const newEjercicios = setEjercicios([])
                localStorage.setItem('ejerciciosEdit', JSON.stringify(newEjercicios))
                const newNombreRutina = setNombreRutina("")
                localStorage.setItem('nombreRutina', JSON.stringify(newNombreRutina))
                navigate("/routines")
            }
            else {
                // Mensaje o Pantalla de error
                console.error(data.message)
            }
        }
        catch (error) {
            console.error("Error al agregar la rutina", error)
        }
    }

    return (
        <div className={"page-nueva-rutina"}>
            <div className='content-nueva-rutina'>
                <div className="cabecera-nueva-rutina">
                    {/* HAY QUE MIRAR PQ TMB PUEDE VOLVER AL HOME ADMIN */}
                    <NavLink to="/routines">
                        <ImCross
                            className="cruz-nueva-rutina" 
                            size="35px" 
                            color="#fba92c"
                        ></ImCross>
                    </NavLink>
                    <Header className="header-nueva-rutina"/>
                </div>
                <div className="principal-nueva-rutina">
                    <div className="titulo-boton">
                        <h1 className="nueva-rutina"> {nombreRutina.toUpperCase()} </h1>
                        <MyButton
                            className="boton-anadir"
                            color="orangeblack"
                            size="xxl"
                            type="submit"
                            value="Guardar"
                            onClick={updateRutina}>
                            Guardar
                        </MyButton>
                    </div>
                    <div className="forms-nueva-rutina">
                        <div className="div-form-nombre-rutina">
                            <p className="nombre-rutina-titulo">NOMBRE DE LA RUTINA</p>
                            <form className="form-nombre-rutina">
                                <input
                                    type="text"
                                    name="nombre-rutina"
                                    value={nombreRutina}
                                    onChange={(e) => setNombreRutina(e.target.value)}    
                                />
                            </form>
                        </div>
                        <div className="div-button-ejercicios">
                            <p className="ejercicios-titulo-boton"> EJERCICIOS </p>
                            <ul>
                                {ejercicios.map((ejercicio, index) => (
                                    <li className="ejercicio-rutina" key={index}>
                                        <h1 className="nom-ex">
                                            {ejercicio.name}
                                        </h1>
                                        <ImCross className="eliminar-ex"
                                            size="30px"
                                            color="#fba92c"
                                            onClick={() => {
                                                eliminarEjercicio(index)
                                                window.location.reload()
                                            }}>
                                        </ImCross>
                                    </li>
                                ))}
                                <li>
                                    <Link to={{ pathname: "/exercises"}}>
                                        <MyButton className="boton-anadir-ejercicio"
                                                color="orangeblack"
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
        </div>
    )
}

export default PageEditRoutine
