import  { useEffect, useState } from 'react'
import { Global } from '../helpers/Global'
import "../css/Historial.css"
import { IoChevronBackOutline , IoChevronForwardOutline} from "react-icons/io5";
import { NavLink } from 'react-router-dom';

import ReactTimeAgo from "react-time-ago"


const Feed = () => {
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)


  
  
  
   const [history, setHistory] = useState([])
    

    const getHistory = async() => {

        const request = await fetch(Global.url+"training/trainingsFriends/" + page, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
                
              }
        })

        const data = await request.json()


        setHistory(data.trainings)
        setMaxPage(Math.ceil(data.total/data.itemsPerPage))

        

        
    }

    const segundosATiempo = (segundos) => {
        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        if(horas == 0){
            return`${minutos}m`
        }else{
            return `${horas}h ${minutos}m`;
        }
        
    }




    useEffect(() => {
        getHistory()
    }, [page])

    
    let uniqueExerciseNames = []


  return (
    <div className='principal-history'>
        {history.length > 0 ? (
            history.map(training => {
            uniqueExerciseNames =  []
                return(
                    <NavLink to={"/showTraining/"+training._id} key={training._id} className='rectangle'>
                        <div className='info-rectangle'>
                            <h3>@{training.user.nick}</h3>
                            <h3>{training.name}</h3>
                            <ReactTimeAgo date={Date.parse(training.created_at)} locale='es-ES' className='date-rectangle'/>
                            <label>{segundosATiempo(training.duration)}</label>
                        </div>
                        <div className='separator'></div>
                        <div className='exercises-rectangle'>
                            <h4>Ejercicios:</h4>
                            {training.sets.map(set => {
                                    const exerciseName = set.exercise.name;
                            //console.log(set.exercise.name)    
                                    if (!uniqueExerciseNames.includes(exerciseName) && uniqueExerciseNames.length < 5) {
                                        uniqueExerciseNames.push(exerciseName);
        
                                return(
                                    <div key={set._id}>
                                        <label>{set.exercise.name}</label>
                                    </div>
                                
                                )}
                            })}
                        </div>
                    </NavLink>
                )
            })
        ) : (
            <p style={{"marginTop": "2%", 
                       "textAlign": "center", 
                       "alignItems": "center", 
                       "fontWeight":"bolder"}}> 
                No hay actividad registrada de tus amigos 
            </p>
        )}
        <div className='pages-historial'>
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
  )
}


export default Feed