import React from "react"
import { useState } from 'react'
import { useEffect } from 'react'
import Sidebar from "./Sidebar"
import Header from "./Header"
import { Link } from 'react-router-dom'
import "../css/PageEjercicios.css"
import { MyButton } from './MyButton'
import { Global } from "../helpers/Global"

const PageEjercicios = () => {
    
    const[sidebar,setSidebar] = useState(false)
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


    return (
        <div className={"page-"+sidebar}>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <div className='content'>
                <Header/>
                <div className="principal">
                    <div className="extit-boton">
                        <h1 className="ejercicios-titulo"> EJERCICIOS </h1>
                        <Link to="/newroutine">
                            <MyButton className="boton-cancelar" color="red" size="xxl" type="submit" value="cancelar">Cancelar</MyButton>
                        </Link>
                    </div>
                    <div className="div-ejercicios">
                        {musclesWithExercises.map(({muscle, exercises}) => (
                            <div className="cada-musculo" key={muscle}>
                                <p className="muscle-titulo">{muscle}</p>
                                <ul>
                                    {exercises.map(exercise => (
                                        <li key={exercise.id}>
                                            <MyButton className="boton-ejercicio"
                                                      color="lightGrey"
                                                      size="xl"
                                                      type="submit"
                                                      value={exercise.name}>
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

export default PageEjercicios
