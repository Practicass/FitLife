import React from 'react'
import Sidebar from './Sidebar'
import { useState } from 'react'
import Header from './Header'
import {ImCross} from "react-icons/im"
import {FaRegEdit} from "react-icons/fa"
import { useEffect } from 'react'
import { Global } from '../helpers/Global'
import { AiFillPlusCircle } from "react-icons/ai"
import { NavLink, useNavigate } from 'react-router-dom'


const PageRoutines = () => {
    const[sidebar,setSidebar] = useState(false)
    const [routines, setRoutines] = useState([])
    const [eliminate, setEliminate] = useState(false)
    const [id, setId] = useState("")

    const getRoutines = async() => {

        const request = await fetch(Global.url+"rutine/rutines", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
              }
        })

        const data = await request.json()


        setRoutines(data.rutines)
    }

    const eliminateRoutine = async(e) => {
        e.preventDefault()
        console.log(id)
        setEliminate(false)

        const request = await fetch(Global.url+"rutine/eliminate/"+ id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")
              
            }
      })

      const data = await request.json()

      console.log(data.status)

        if(data.status == "success"){
            getRoutines()
        }

    }


    useEffect(() => {
        getRoutines()
    }, [])  
    
    const navigate = useNavigate()
    const editarRutina = async (idRutina) => {
        try {
            const response = await fetch(Global.url + 'rutine/routine/' + idRutina, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            })
            const rutina = await response.json()
            const ejercicios = rutina.rutine.exercises
            const nombreRutinaEdit = rutina.rutine.name
            await localStorage.setItem('ejerciciosEdit', JSON.stringify(ejercicios))
            await localStorage.setItem('idRutinaEdit', JSON.stringify(idRutina))
            await localStorage.setItem('nombreRutinaEditTitulo', JSON.stringify(nombreRutinaEdit))
            await localStorage.setItem('nombreRutinaEdit', JSON.stringify(nombreRutinaEdit))
            navigate("/editroutine")
        } catch (error) {
                console.error("Error al obtener los datos de la rutina", error)
        }
    }

  return (
    <div className={'page-'+sidebar}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='content'>
            <Header/>
            <div className='principal-routines'>
                {eliminate ? 
                    <div className='askEliminate'>
                        <h3>¿ESTAS SEGURO?</h3>
                        <button onClick={eliminateRoutine}>SI</button>
                        <button onClick={e => setEliminate(false)}>NO</button>
                    </div>
                    :
                    <></>
                }
                
                <div className={'myRoutines-'+eliminate}>
                    <h2>MIS RUTINAS</h2>
                    <div className='routines' >
                        {routines.map( routine => {
                            
                            if(routine.user.rol == "usuario"){

                                return(
                                        <div className='square' key={routine._id}>
                                            <h3 className='title-routine'>{routine.name}</h3>
                                            <div className='cross' ><ImCross size="25px" color='#fba92c' onClick={e => {setId(routine._id) ; setEliminate(true) }}/></div>
                                            <div className='exercises-routine'>
                                                <div className='exercises-par'>
                                                
                                                    { routine.exercises.map((exercise,index) => {
                                                        if(index % 2 == 0 ){
                                                            return(
                                                    
                                                                <label className="ejerciciosLabel" key={exercise._id}>{exercise.name}</label>
                                                            )
                                                        }
                                                        
                                                    })} 

                                                </div>
                                                <div className='separator'></div>

                                                <div className='exercises-impar'>
                                                { routine.exercises.map((exercise,index) => {
                                                        if(index % 2 != 0 ){
                                                            return(
                                                    
                                                                <label className="ejerciciosLabel" key={exercise._id}>{exercise.name}</label>
                                                            )
                                                        }
                                                        
                                                    })} 
                                                </div>
                                            </div>
                                            <div className='edit' onClick={() => { editarRutina(routine._id)} }><FaRegEdit size="32px" color='#fba92c'/></div>
                                        </div>                                    
                                )
                            }
                        })}
                        <NavLink className='squareAdd' to="/newroutine">
                                <div className='addRoutine'>
                                    <AiFillPlusCircle color='#9e9e9e' size="50px"/>
                                </div>
                        </NavLink>
                    </div>
                    
                </div>
                <div className={'popRoutines-'+eliminate}>
                    <h2>RUTINAS POPULARES</h2>
                    <div className='routines' >
                        {routines.map( routine => {
                            
                            if(routine.user.rol == "administrador"){

                                return(
                                    
                                        <div className='square' key={routine._id}>
                                            <h3 className='title-routine'>{routine.name}</h3>
                                        
                                            <div className='exercises-routine'>
                                                <div className='exercises-par'>
                                                
                                                    { routine.exercises.map((exercise,index) => {
                                                        if(index % 2 == 0 ){
                                                            return(
                                                    
                                                                <label className="ejerciciosLabel" key={exercise._id}>{exercise.name}</label>
                                                            )
                                                        }
                                                        
                                                    })} 

                                                </div>
                                                <div className='separator'></div>

                                                <div className='exercises-impar'>
                                                { routine.exercises.map((exercise,index) => {
                                                        if(index % 2 != 0 ){
                                                            return(
                                                    
                                                                <label className="ejerciciosLabel" key={exercise._id}>{exercise.name}</label>
                                                            )
                                                        }
                                                        
                                                    })} 
                                                </div>
                                            </div>
                                        </div> 
                                    
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}
export default PageRoutines
