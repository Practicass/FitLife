/* eslint-disable react/prop-types */
import React, { useRef } from "react"
import { useState, useEffect } from 'react'
import Header from "./Header"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "../css/PageEjercicios.css"
import { MyButton } from './MyButton'
import { Global } from "../helpers/Global"
import { ImCross } from "react-icons/im"

const PageEjerciciosEdit = ({ ejercicios, setEjercicios }) => {
    
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

    const forceUpdate = useRef(0)
    const navigate = useNavigate()
    // Para pasar ejercicios a PageNuevaRutina
    const agregarEjercicio = (ejercicio) => {
        if (!ejercicios.some((e) => e._id === ejercicio._id)) {
            setEjercicios((prevEjercicios) => {
                const newEjercicios = [...prevEjercicios, ejercicio]
                localStorage.setItem('ejerciciosEdit', JSON.stringify(newEjercicios))
                return newEjercicios    
            })
        }
        forceUpdate.current = Date.now()
    }

    return (
        <div className="page-ejercicios">
            <div className='content-ejercicios'>
                <div className="cabecera-ejercicios">
                    <NavLink to="/editroutine">
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
                                            <MyButton className="boton-ejercicio"
                                                    color="lightGrey"
                                                    size="xl"
                                                    type="submit"
                                                    value={exercise.name}
                                                    onClick={() => {
                                                        agregarEjercicio(exercise)
                                                        navigate("/editroutine")
                                                    }} >
                                                {exercise.name}
                                            </MyButton>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default PageEjerciciosEdit
