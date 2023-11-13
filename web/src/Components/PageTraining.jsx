/* eslint-disable react-hooks/exhaustive-deps */

import {ImCross} from "react-icons/im"
import "../css/PageTraining.css"
import { useParams } from "react-router-dom"
import { Global } from "../helpers/Global"
import { useEffect, useState } from "react"
import {BiSolidXSquare} from "react-icons/bi"
import useForm from "../hooks/useForm"

const PageTraining = () => {
    const params = useParams()
    const id = params.id
    const [routine, setRoutine] = useState({exercises:[]})
    const {form,changed} = useForm({})


    const getRoutine = async() => {
        
        const request = await fetch(Global.url+"rutine/rutine/"+id, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
                
              }
        })

        const data = await request.json()


        setRoutine(data.rutine)

        
        console.log(routine)
        
    }

    const validarNumero = (e) => {
        // Obtener el código de la tecla pulsada
        const codigoTecla = e.which || e.keyCode;
    
        // Permitir teclas de control como Enter y retroceso
        if (e.ctrlKey || e.altKey || codigoTecla < 32) {
          return;
        }
    
        // Asegurarse de que solo se introduzcan números
        if (codigoTecla < 48 || codigoTecla > 57) {
          e.preventDefault();
        }
      };

    useEffect(() => {
        getRoutine()
    }, [])  



  return (
    <div className="pageTraining">
      <div className="cross-training"><ImCross size="35px" color='#fba92c'/></div>
      <div className="title-training"><h1>{routine.name}</h1></div>
      <div className="addTraining">
        {routine.exercises.map( (exercise,index) => {
            return(
                <div className="exercise-training" key={exercise._id}>
                    <h2 className="title-exercise">{index+1}.{exercise.name}</h2>
                    <div className="sets">
                        <div className="num">
                            <label>Serie</label>
                            <label className="input-exercise">0</label>
                        </div>
                        <div className="rep">
                            <label>Repeticiones</label>
                            <input className="input-exercise" type="number" name="reps" min="1" onKeyDown={validarNumero} onChange={changed}/>
                        </div>
                        <div className="kg">
                            <label>Peso(kg)</label>
                            <input className="input-exercise" type="number" name="weight"min="1" onKeyDown={validarNumero} onChange={changed}/>
                        </div>
                        <div className="eliminate-set">
                            <BiSolidXSquare size="30px" color='#fba92c'/>
                        </div>
                    </div>
                    <div className="addSet"></div>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default PageTraining
