import React from "react"
import { useState } from 'react'
import { useEffect } from 'react'
import Sidebar from "./Sidebar"
import Header from "./Header"
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa"
import {ImCross} from "react-icons/im"
import "../css/PageEjercicios.css"
import { MyButton } from './MyButton'
import { Global } from "../helpers/Global"

const PageEjercicios = () => {
    
    const[sidebar,setSidebar] = useState(false)
    const[muscle, setMuscles] = useState([])
    const[exercises, setExercises] = useState({})

    useEffect(() => {
        const fetchdata = async () => {
            try {
                // Llamar a la API para obtener los múscilos
                const musclesResponse = await fetch(Global.url+'musculo/muscles')
                const musclesData = await musclesResponse.json()
                setMuscles(musclesData.muscles)

                const exercisesResponse = await fetch(Global.url+'ejercicio/exercises')
                const exercisesData = await exercisesResponse.json()
                setExercises(exercisesData.exercises)
            } catch (error) {
                console.error("Error al obtener datos: ", error)
            }
        }
        fetchdata()
    }, [])

    const groupExercisesByMuscle = () => {
        const groupedExercises = muscle.map(muscle => ({
            muscle: muscle.name,
            exercises: exercises.filter(exercise => exercise.muscle === muscle.id)
        }))

        return groupedExercises
    }

    const groupedExercises = groupExercisesByMuscle()

    return (
        <div className={"page-"+sidebar}>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <div className='content'>
                <Header/>
                <div className="principal">
                    <h1 className="nueva-rutina"> EJERCICIOS </h1>
                    <div className="div-ejercicios">
                        {groupedExercises.map(item => (
                            <div className="column-muscle" key={item.muscle} >
                                <p className="muscle">{item.muscle}</p>
                                <ul>
                                    {item.exercises.map(exercise => (
                                        <li key={exercise._id}>{exercise.name}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <Link to="/newroutine">
                            <MyButton color="red" size="xxl" type="submit" value="cancelar">Cancelar</MyButton>
                        </Link>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default PageEjercicios
