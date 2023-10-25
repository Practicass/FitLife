import React from 'react'
import Sidebar from './Sidebar'
import { useState } from 'react'
import Header from './Header'
import {ImCross} from "react-icons/im"
import {FaRegEdit} from "react-icons/fa"
import { useEffect } from 'react'
import { Global } from '../helpers/Global'


const PageRoutines = () => {
    const[sidebar,setSidebar] = useState(false)
    const [routines, setRoutines] = useState([])
    const [parExer, setParExer] = useState([])
    
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


    useEffect(() => {
        getRoutines()
    }, [])

    useEffect(() => {
        console.log(routines)

      }, [routines]);

    
      
    

  return (
    <div className={'page-'+sidebar}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='content'>
            <Header/>
            <div className='principal-routines'>
                <div className='myRoutines-'>
                    <h2>MIS RUTINAS</h2>
                    {routines.map( routine => {


                        return(
                            <div className='routines' key={routine._id}>
                                <div className='square'>
                                    <h3 className='title-routine'>{routine.name}</h3>
                                    <div className='cross'><ImCross size="25px" color='#fba92c'/></div>
                                    <div className='exercises-routine'>
                                        <div className='exercises-par'>
                                            {/* {routine.exercises.map( exercise => {

                                                return(
                                                    
                                                    <label className="ejerciciosLabel" key={exercise._id}>{exercise.name}</label>
                                                    

                                                )
                                            })} */}
                                            {/* {console.log(routine.exercises)}
                                           { 

                                            console.log(routine.exercises.filter( (index) => index % 2 ))} */}
                                            { routine.exercises.filter( (index) => index % 2 ).map(exercise => {
                                               
                                                    <label className="ejerciciosLabel" key={exercise._id}>{exercise.name}</label>
                                                
                                            })} 
                                        
                                                    
    
                                            {/* {routine.exercises.filter( (exercise,) => {
                                                    if(index % 2 == 0 && index < 10){
                                                        console.log(`Index ${index}`)
                                                        console.log(exercise)
                                                        return(
                                                            <label className="ejerciciosLabel" key={exercise._id}>{exercise.name}</label>
                                                        )
                                                    }
                                                
                                                

                                            })} */}
                                        </div>
                                        <div className='separator'></div>

                                        <div className='exercises-impar'>
                                            <label>hola</label>
                                            <label>hola</label>
                                        </div>
                                    </div>
                                    <div className='edit'><FaRegEdit size="32px" color='#fba92c'/></div>
                                </div> 
                            </div>
                        )
                    })}
                    
                </div>
                <div className='popRoutines'>
                    <h2>RUTINAS POPULARES</h2>
                    <div className='routines'>
                        <div className='square'>

                        </div>
                        <div className='square'>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}
export default PageRoutines
