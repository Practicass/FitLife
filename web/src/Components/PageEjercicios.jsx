import React from "react"
import { useState } from 'react'
import { useEffect } from 'react'
import Sidebar from "./Sidebar"
import Header from "./Header"
import { Link, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa"
import {ImCross} from "react-icons/im"
import "../css/PageEjercicios.css"
import { MyButton } from './MyButton'
import { Global } from "../helpers/Global"

const PageEjercicios = () => {
    
    const[sidebar,setSidebar] = useState(false)
    const[muscle, setMuscles] = useState([])
    const[exercises, setExercises] = useState([])
    
    // Para pasar el ejercicio a PageNuevaRutina
    const navigate = useNavigate()
    const [nuevoEjercicio, setNuevoEjercicio] = useState("")

    const handleGuardar = () => {
        // Se guarda el ejercicio y se envia de vuelta a PageNuevaRutina
        navigate.push("/newroutine", {nuevoEjercicio})
    }

    useEffect(() => {
        const fetchdata = async () => {
            try {
                // Llamar a la API para obtener los múscilos
                const musclesResponse = await fetch(Global.url+'muscle/muscles')
                const musclesData = await musclesResponse.json()
                setMuscles(musclesData.muscles)

                const exercisesResponse = await fetch(Global.url+'exercise/exercises')
                const exercisesData = await exercisesResponse.json()
                setExercises(exercisesData.exercises)
            } catch (error) {
                // console.error("Error al obtener datos: ", error)
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
                                    {item.exercises.map((exercise) => (
                                        <MyButton
                                            key={exercise.id}
                                            className="boton-ejercicio"
                                            color="lightGrey"
                                            size="xl"
                                            type="submit"
                                            value={exercise.name}
                                            onClick={() => {
                                                setNuevoEjercicio(exercise.name)
                                                handleGuardar()
                                            }}
                                            ></MyButton>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <Link to="/newroutine">
                            <MyButton className="boton-cancelar" color="red" size="xxl" type="submit" value="cancelar">Cancelar</MyButton>
                        </Link>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default PageEjercicios
