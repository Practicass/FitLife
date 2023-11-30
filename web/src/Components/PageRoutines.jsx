import Sidebar from './Sidebar'
import { useState } from 'react'
import Header from './Header'
import {ImCross} from "react-icons/im"
import {FaRegEdit} from "react-icons/fa"
import { useEffect } from 'react'
import { Global } from '../helpers/Global'
import { AiFillPlusCircle } from "react-icons/ai"
import { NavLink } from 'react-router-dom'
import { IoChevronBackOutline , IoChevronForwardOutline} from "react-icons/io5";




const PageRoutines = () => {
    const[sidebar,setSidebar] = useState(false)
    const [routines, setRoutines] = useState([])
    const [routinesAdmin, setRoutinesAdmin] = useState([])
    const [eliminate, setEliminate] = useState(false)
    const [id, setId] = useState("")
    const [page, setPage] = useState(1)
    const [pageAdmin, setPageAdmin] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [maxPageAdmin, setMaxPageAdmin] = useState(1)


        
    
    const getRoutinesUser = async() => {

        const request = await fetch(Global.url+"rutine/rutinesUser/"+page, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
                
              }
        })

        const data = await request.json()

        
        setRoutines(data.rutines)
        setMaxPage(Math.ceil(data.total/data.itemsPage))
        //console.log
        

        
    }
    const getRoutinesAdmin = async() => {

        const request = await fetch(Global.url+"rutine/rutinesAdmin/"+pageAdmin, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
                
              }
        })

        const data = await request.json()

        
        setRoutinesAdmin(data.rutines)
        setMaxPageAdmin(Math.ceil(data.total/data.itemsPage))
        

        
    }

    const eliminateRoutine = async(e) => {
        e.preventDefault()
        //console.log(id)
        setEliminate(false)

        const request = await fetch(Global.url+"rutine/eliminate/"+ id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")
              
            }
      })

      const data = await request.json()

      //console.log(data.status)

        if(data.status == "success"){
            getRoutinesUser()
        }

    }


    useEffect(() => {
        getRoutinesUser()
        
    }, [page]) 
    useEffect(() => {
        getRoutinesAdmin()
    }, [pageAdmin])  
    
      
    

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
                    <h2 className='text-2xl lg:text-4xl'>MIS RUTINAS</h2>
                    <div className='routines' >
                        {routines.map( routine => {
                            
                            if(routine.user.rol == "usuario"){

                                return(
                                    
                                        <div className='square ' key={routine._id}>
                                            <NavLink to={"/training/"+routine._id} className='title-routine '><h3 className='text-lg lg:text-2xl'>{routine.name}</h3></NavLink>
                                            <div className='cross' ><ImCross size="25px" color='#fba92c' onClick={() => {setId(routine._id) ; setEliminate(true) }}/></div>
                                            <NavLink to={"/training/"+routine._id} className='exercises-routine'>
                                                <div className='exercises-par'>
                                                
                                                    { routine.exercises.map((exercise,index) => {
                                                        if(index % 2 == 0 && index < 12){
                                                            return(
                                                    
                                                                <label className="ejerciciosLabel text-xs lg:text-base" key={exercise._id}>{exercise.name}</label>
                                                            )
                                                        }
                                                        
                                                    })} 

                                                </div>
                                                <div className='separatorR'></div>

                                                <div className='exercises-impar'>
                                                { routine.exercises.map((exercise,index) => {
                                                        if(index % 2 != 0 && index < 12){
                                                            return(
                                                    
                                                                <label className="ejerciciosLabel text-xs lg:text-base" key={exercise._id}>{exercise.name}</label>
                                                            )
                                                        }
                                                        
                                                    })} 
                                                </div>
                                            </NavLink>
                                            <NavLink to={"/editroutine/" + routine._id}>
                                                <div className='edit'><FaRegEdit size="32px" color='#fba92c'/></div>
                                            </NavLink>
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
                    <div className='pages-historial-routines'>
                        <IoChevronBackOutline className="modify-num-page-icon" size="35px" color='#fba92c'onClick={()=>{
                            if(page>1){
                                setPage(page-1)
                            }
                        }}/>
                        <label>{page}</label>
                        <IoChevronForwardOutline className="modify-num-page-icon"size="35px" color='#fba92c' onClick={()=>{
                            if(page<maxPage){
                                setPage(page+1)
                            }
                        }}/>
                    </div>
                    
                </div>
                <div className={'popRoutines-'+eliminate}>
                    <h2 className='text-2xl lg:text-4xl'>RUTINAS PREDETERMINADAS</h2>
                    <div className='routines' >
                        {routinesAdmin.map( routine => {
                            
                            if(routine.user.rol == "admin"){

                                return(
                                    
                                        <div className='square' key={routine._id}>
                                             <NavLink to={"/training/"+routine._id} className='title-routine'><h3 className='title-routine text-lg lg:text-2xl'>{routine.name}</h3></NavLink>
                                        
                                            
                                            <NavLink to={"/training/"+routine._id} className='exercises-routine'>
                                                <div className='exercises-par'>
                                                
                                                    { routine.exercises.map((exercise,index) => {
                                                        if(index % 2 == 0 && index < 8){
                                                            return(
                                                    
                                                                <label className="ejerciciosLabel" key={exercise._id}>{exercise.name}</label>
                                                            )
                                                        }
                                                        
                                                    })} 

                                                </div>
                                                <div className='separatorR'></div>

                                                <div className='exercises-impar'>
                                                { routine.exercises.map((exercise,index) => {
                                                        if(index % 2 != 0 && index < 8){
                                                            return(
                                                    
                                                                <label className="ejerciciosLabel" key={exercise._id}>{exercise.name}</label>
                                                            )
                                                        }
                                                        
                                                    })} 
                                                </div></NavLink>
                                            
                                        </div> 
                                    
                                )
                            }
                        })}
                    </div>
                    <div className='pages-historial-routines'>
                        <IoChevronBackOutline className="modify-num-page-icon" size="35px" color='#fba92c'onClick={()=>{
                            if(pageAdmin>1){
                                setPageAdmin(pageAdmin-1)
                            }
                        }}/>
                        <label>{pageAdmin}</label>
                        <IoChevronForwardOutline className="modify-num-page-icon"size="35px" color='#fba92c' onClick={()=>{
                            if(pageAdmin<maxPageAdmin){
                                setPageAdmin(pageAdmin+1)
                            }
                        }}/>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}
export default PageRoutines
