import Sidebar from './Sidebar'
import { useState } from 'react'
import Header from './Header'
import {ImCross} from "react-icons/im"
import {FaRegEdit} from "react-icons/fa"
import { useEffect } from 'react'
import { Global } from '../helpers/Global'
import { AiFillPlusCircle } from "react-icons/ai"
import { NavLink } from 'react-router-dom'



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
      
    

  return (
    <div className={'page-'+sidebar}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='content'>
            <Header/>
            <div className='principal-routines'>
                {eliminate ? 
                    <div className='askEliminate'>
                        <h3>¿ESTAS SEGURO?</h3>
                        <div>
                        <button className="boton-eliminar-routine" onClick={() => setEliminate(false)}>NO</button>
                            <button className="boton-eliminar-routine" onClick={eliminateRoutine}>SI</button>
                            
                        </div>
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
                                            <NavLink to={"/training/"+routine._id} className='title-routine'><h3 >{routine.name}</h3></NavLink>
                                            <div className='cross' ><ImCross size="25px" color='#fba92c' onClick={() => {setId(routine._id) ; setEliminate(true) }}/></div>
                                            <NavLink to={"/training/"+routine._id} className='exercises-routine'>
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
                                            </NavLink>
                                            <div className='edit'><FaRegEdit size="32px" color='#fba92c'/></div>
                                        </div> 
                                    
                                )
                            }
                        })}
                        <NavLink className='squareAdd' to="/addRoutine">
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
