/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useEffect } from 'react'
import Header from "./Header"
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import "../css/PageNuevaRutina.css"
import "../css/PageEjercicios.css"
import { ImCross } from "react-icons/im"
import { MyButton } from './MyButton'
import { Global } from "../helpers/Global"
import { Tooltip } from '@nextui-org/react'


const PageEditRoutine = () => {

    const {id} = useParams()
    const [num, setNum] = useState(1)
    const [ejercicios, setEjercicios] = useState([])
    const [nombreRutina, setNombreRutina] = useState("")
    const [nombreRutinaTitulo, setNombreRutinaTitulo] = useState("")
    useEffect(() => {
        const ponerNombreRutina = async () => {
            try {
                const response = await fetch(Global.url + "rutine/rutine/" + id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }
                })

                const data = await response.json()

                if (data.status === "success") {
                    setNombreRutina(data.rutine.name)
                    setNombreRutinaTitulo(data.rutine.name)
                }
                else {
                    // Mensaje o Pantalla de error
                    console.error(data.message)
                }
            }
            catch (error) {
                console.log("Error al pedir el nombre de la rutina :", error)
            }
        }
        const ponerEjercicios = async() => {
            try {
                const response = await fetch(Global.url + "rutine/rutine/" + id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }
                })

                const data = await response.json()

                if (data.status === "success") {
                    setEjercicios(data.rutine.exercises)
                }
                else {
                    // Mensaje o Pantalla de error
                    console.error(data.message)
                }
            }
            catch (error) {
                console.log("Error al pedir los ejercicios de la rutina")
            }

        }

        ponerNombreRutina()
        ponerEjercicios()
    }, [])


    const navigate = useNavigate()

    const eliminarEjercicio = (index) => {
        const newEjercicios = [...ejercicios]
        newEjercicios.splice(index,1)
        setEjercicios(newEjercicios)
    }

    const updateRutina = async () => {
        try {
            const response = await fetch(Global.url + "rutine/update/" + id, {
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

    // Para mostrar los ejercicios

    // Se obtiene todos los ejercicios ordenados por musculo
    const[musclesWithExercises, setMusclesWithExercises] = useState([])

    const fetchMusclesWithExercises = async () => {
        try {
            const response = await fetch(Global.url + "muscle/muscles")
            const muscleData = await response.json()
            const muscles = muscleData.muscles

            const musclesWithExercisesPromises = muscles.map(async (muscle) => {
                const exerciseResponse = await fetch(Global.url + 'exercise/exercises/'+  muscle._id)
                const exerciseData = await exerciseResponse.json()

                return {
                    muscle: muscle.name,
                    exercises: exerciseData.exercises,
                }
            })
            const musclesWithExercises = await Promise.all(musclesWithExercisesPromises)
            setMusclesWithExercises(musclesWithExercises)
        } catch (error) {
            console.error('Error fetching muscles with exercises', error)
        }
    }

    useEffect(() => {
        fetchMusclesWithExercises()
    }, [])

    const agregarEjercicio = (ejercicio) => {
        const estaEjercicio = ejercicios.find(e => ejercicio._id === e._id)

        if (!estaEjercicio) {
            setEjercicios(prevEjercicios => [...prevEjercicios, ejercicio])
        }
    }


    return (
        <div className={"page-nueva-rutina"}>
            {num == 1 ?
            <div className='content-nueva-rutina'>
                <div className="cabecera-nueva-rutina">
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
                        <h1 className="nueva-rutina"> {nombreRutinaTitulo.toUpperCase()} </h1>
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
                                    className='input-nombre-rutina'
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
                                            }}>
                                        </ImCross>
                                    </li>
                                ))}
                                <li>
                                    <MyButton className="boton-anadir-ejercicio"
                                                color="orangeblack"
                                                size="xxl" 
                                                type="submit" 
                                                value="+"
                                                onClick={() => setNum(2)}>
                                            +
                                    </MyButton>
                                </li>
                            </ul>
                        </div>                    
                    </div>
                </div>
            </div>
            :
            <div className="page-ejercicios">
            <div className='content-ejercicios'>
                <div className="cabecera-ejercicios">
                    <NavLink to="/newroutine">
                        <ImCross className="cruz-ejercicios" size="35px" color="#fba92c"></ImCross>
                    </NavLink>
                    <Header className="header-ejercicios"/>
                </div>
                <div className="principal-ejercicios">
                    <h1 className="ejercicios-titulo"> EJERCICIOS </h1>
                    <div className="div-ejercicios">
                        {musclesWithExercises.map(({muscle, exercises}) => (
                            <div className="cada-musculo" key={muscle}>
                                <p className="muscle-titulo">{muscle}</p>
                                <ul className="ul-ex">
                                    {exercises.map((exercise, index) => (
                                        <li className="li-ex" key={index}>
                                            <Tooltip color='warning' placement='bottom' content={exercise.description}>
                                            <MyButton className="boton-ejercicio"
                                                    color="lightGrey"
                                                    size="xl"
                                                    type="submit"
                                                    value={exercise.name}
                                                    onClick={() => {
                                                        agregarEjercicio(exercise)
                                                        setNum(1)
                                                    }} >
                                                {exercise.name}
                                            </MyButton></Tooltip> 
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>                    
                </div>
            </div>
        </div>

            }
        </div>
    )
}

export default PageEditRoutine
