/* eslint-disable react-hooks/exhaustive-deps */

import {ImCross} from "react-icons/im"
import "../css/PageTraining.css"
import { NavLink, useParams } from "react-router-dom"
import { Global } from "../helpers/Global"
import { useEffect, useState } from "react"
import ReactTimeAgo from "react-time-ago"



const PageShowTraining = () => {
    const params = useParams()
    const id = params.id
    const [sets, setSets] = useState([]);

    const [name , setName] = useState("")
    const date = new Date()

    const [duration, setDuration] = useState(date)
    const [nick, setNick] = useState("")
  

    useEffect(() => {
        getTraining()
  }, []) 


    const getTraining = async() => {
        
        const request = await fetch(Global.url+"training/training/"+id, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
                
              }
        })

        const data = await request.json()


        //console.log(routineAux)
        //console.log(data.training.created_at)

        //setSets(setsCopy);
        setName(data.training.name)
        setSets(data.training.sets)
        setDuration(data.training.created_at)
        setNick(data.training.user.nick)

    }  


    let uniqueSetId = []
    let numSerie

  return (
    <div className="pageTraining">
      <NavLink to={-1} className="cross-training"><ImCross size="35px" color='#fba92c'/></NavLink>
      <div className="title-training">
        <h1>{name}</h1>
        <div className="titulo-showTraining">
            <label>@{nick}</label>
            <ReactTimeAgo date={Date.parse(duration)} locale='es-ES' className='date-rectangle'/>
        </div>
        
      </div>
      
      <div className="addTraining">        
        {sets.map( (set) => {
            numSerie = 0
            const setId = set.exercise._id;

            if (!uniqueSetId.includes(setId)) {
                uniqueSetId.push(setId);
                //console.log(set)
          return(
              <div className={"exercise-training"} key={set._id}>
                  <h2 className="title-exercise">{uniqueSetId.length}.{set.exercise.name}</h2>
                  <div className="categories">
                  {set.exercise.muscle.name == "Cardio" || set.exercise.muscle.name == "Full-body" ?
                      <>
                        <label className="title-num-cardio">Serie</label>
                        <label className="title-reps-cardio">Tiempo</label>
                      </>
                      :
                      
                        <>
                        <label className="title-num">Serie</label>
                        <label className="title-reps">Repeticiones</label>
                        <label className="title-kg">Peso(kg)</label>
                        </>
                      
                    }
                  </div>
                  <div className="sets">
                    {sets.map((set2, setIndex2) => {
                      
                        if(set2.exercise._id == setId){
                            numSerie++
                            if(set2.exercise.muscle.name == "Cardio" || set2.exercise.muscle.name == "Full-body" ){
                              return(
                                <div className="set" key={setIndex2}>
                                  <label className="input-exercise num" >{numSerie}</label>
                                  <label className="input-exercise reps">{set2.time}</label> 
                                </div>
                              )
                            }else{
                              return(
                                <div className="set" key={setIndex2}>
                                  <label className="input-exercise num" >{numSerie}</label>
                                  <label className="input-exercise reps"   >{set2.reps}</label> 
                                  <label className="input-exercise kg" >{set2.weight}</label>
                                </div>
                              )
                            }
                            
                          }
                    })}
                  </div>
                  

              </div>
          )
        }
        })}
           
        
        
      </div>
    </div>
  )
}


export default PageShowTraining
