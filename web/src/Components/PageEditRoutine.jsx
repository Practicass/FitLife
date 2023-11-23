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
            const storedNombreRutina = localStorage.getItem("nombreRutinaEdit")
            return storedNombreRutina ? JSON.parse(storedNombreRutina) : ""
        } catch (error) {
            console.error("Error al analizar JSON desde localStorage: ", error)
            return ""
        }
    })

    const [nombreRutinaEditTitulo, setNombreRutinaEditTitulo] = useState(() => {
        try {
            const storedNombreRutinaEdit = localStorage.getItem('nombreRutinaEditTitulo')
            return storedNombreRutinaEdit ? JSON.parse(storedNombreRutinaEdit) : ""
        } catch (error) {
            console.error("Error al analizar JSON desde localStorage:", error)
            return ""
        }
    })

    useEffect(() => {
        localStorage.setItem("nombreRutinaEdit", JSON.stringify(nombreRutina))
    }, [nombreRutina])
    
    useEffect(() => {
        const obtenerNombreRutina = async () => {
            try {
                const response = await fetch(Global.url + "rutine/routine/" + idRutina, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }
                })
                const rutina = response.rutine
                setNombreRutinaEditTitulo(rutina.name)
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
            const response = await fetch(Global.url + "rutine/update/" + idRutina, {
                method: "PUT",
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
                localStorage.setItem('nombreRutinaEdit', JSON.stringify(newNombreRutina))
                navigate("/routines")
            }
            else {
                console.error(data.message)
            }
        }
        catch (error) {
            console.error("Error al agregar la rutina", error)
        }
    }

    const vaciar = () => {
        const newEjercicios = []
        localStorage.setItem('ejerciciosEdit', JSON.stringify(newEjercicios))
        console.log(localStorage.getItem('ejercicios'))
        const newNombre = ""
        localStorage.setItem('nombreRutina', JSON.stringify(newNombre))
        navigate("/routines")
    }

    return (
        <div className={"page-nueva-rutina"}>
            <div className='content-nueva-rutina'>
                <div className="cabecera-nueva-rutina">
                    {/* HAY QUE MIRAR PQ TMB PUEDE VOLVER AL HOME ADMIN */}
                    {/* <NavLink to="/routines"> */}
                        <ImCross
                            className="cruz-nueva-rutina" 
                            size="35px" 
                            color="#fba92c"
                            onClick={vaciar}
                        ></ImCross>
                    {/* </NavLink> */}
                    <Header className="header-nueva-rutina"/>
                </div>
                <div className="principal-nueva-rutina">
                    <div className="titulo-boton">
                        <h1 className="nueva-rutina"> {nombreRutinaEditTitulo.toUpperCase()} </h1>
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
                                    <Link to={{ pathname: "/exercisesedit"}}>
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
