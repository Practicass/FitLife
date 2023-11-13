import  { useEffect, useState } from 'react'
import { Global } from '../helpers/Global'
import "../css/Historial.css"

import ReactTimeAgo from "react-time-ago"


const Historial = () => {
    


  
  
  
   const [history, setHistory] = useState([])
    

    const getHistory = async() => {

        const request = await fetch(Global.url+"training/trainings", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
                
              }
        })

        const data = await request.json()


        setHistory(data.trainings)

        

        
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
    }, [])

    useEffect(() => {
        // Este efecto se ejecuta cuando 'history' cambia.
        console.log(history)

      }, [history]);
    
    


  return (
    <div className='principal-history'>
    {history.map(training => {
        
        return(
            <div key={training._id} className='rectangle'>
                <div className='info-rectangle'>
                    <h3>{training.name}</h3>
                    <ReactTimeAgo date={Date.parse(training.created_at)} locale='es-ES' className='date-rectangle'/>
                    <label>{segundosATiempo(training.duration)}</label>
                </div>
                <div className='separator'></div>
                <div className='exercises-rectangle'>
                    <h4>Ejercicios:</h4>
                    {training.sets.map(set => {
                        console.log(set.exercise)
                        return(
                            <div key={set._id}>
                                <label>{set.exercise.name}</label>
                            </div>
                        
                        )
                    })}
                </div>
            </div>
        )
    })}
</div>
  )
}


export default Historial