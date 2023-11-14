/* eslint-disable react-hooks/exhaustive-deps */

import {ImCross} from "react-icons/im"
import "../css/PageTraining.css"
import { useParams } from "react-router-dom"
import { Global } from "../helpers/Global"
import { useEffect, useState } from "react"
import {BiSolidXSquare, BiSolidPlusSquare} from "react-icons/bi"
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

    const [sets, setSets] = useState([]);

  const handleAddSet = (exerciseIndex) => {
    // Crear una copia del array de sets
    
    const setsCopy = [...sets];

    if (setsCopy[exerciseIndex] && setsCopy[exerciseIndex].length >= 5) {
      // Puedes manejar esta situación de alguna manera, por ejemplo, mostrando un mensaje al usuario
      console.log("Ya has alcanzado el máximo de 6 sets para este ejercicio.");
      return;
    }
    
    // Agregar un nuevo set para el ejercicio específico
    setsCopy[exerciseIndex] = setsCopy[exerciseIndex] || [];
    setsCopy[exerciseIndex].push({
      // Aquí puedes colocar cualquier información que necesites para cada set
      reps: 0,
      weight: 0,
    });

    // Actualizar el estado con la nueva copia del array de sets
    setSets(setsCopy);
  }

  const handleDeleteSet = (exerciseIndex) => {
    // Crear una copia del array de sets
    const setsCopy = [...sets];
  
    if (setsCopy[exerciseIndex]) {
      setsCopy[exerciseIndex].pop();
    }
  
    // Actualizar el estado con la nueva copia del array de sets
    setSets(setsCopy);
  
    // Actualizar el estado de info directamente
    setInfo((prevSets) => {
      const newSets = [...prevSets];
      if (newSets[exerciseIndex]) {
        console.log(newSets[exerciseIndex].weight)
        newSets[exerciseIndex].weight.pop();
        newSets[exerciseIndex].reps.pop();
        console.log(newSets[exerciseIndex].weight)
      }
      return newSets;
    });
  
    //console.log(sets, info);
  };

  const [info, setInfo] = useState([]);

  const saveInfo = (event, exerciseIndex, setIndex) => {
    const { name, value } = event.target;

    // Actualizar el estado con los nuevos datos
    setInfo((prevSets) => {
      const newSets = [...prevSets];
      if (!newSets[exerciseIndex]) {
        newSets[exerciseIndex] = { reps: [], weight: [] };
      }

        newSets[exerciseIndex][name][setIndex] = value
      

      // Almacenar el valor en el array correspondiente en el objeto
      
      return newSets;
    });
  };


  return (
    <div className="pageTraining">
      <div className="cross-training"><ImCross size="35px" color='#fba92c'/></div>
      <div className="title-training"><h1>{routine.name}</h1></div>
      <div className="addTraining">
        {routine.exercises.map( (exercise,exerciseIndex) => {

            return(
                <div className="exercise-training" key={exercise._id}>
                    <h2 className="title-exercise">{exerciseIndex+1}.{exercise.name}</h2>
                    <div className="categories">
                      <label className="title-num">Serie</label>
                      <label className="title-reps">Repeticiones</label>
                      <label className="title-kg">Peso(kg)</label>
                    </div>
                    <div className="sets">
                      {sets[exerciseIndex] && sets[exerciseIndex].map((set, setIndex) => (
                        <div className="set" key={setIndex}>
                          <label className="input-exercise num" >{setIndex+1}</label>
                          <input className="input-exercise reps" type="number" name={`reps`} min="1" onKeyDown={validarNumero} onChange={(e) => saveInfo(e, exerciseIndex, setIndex)}/> 
                          <input className="input-exercise kg" type="number" name={`weight`} min="1" onKeyDown={validarNumero} onChange={(e) => saveInfo(e, exerciseIndex, setIndex)}/>
                          <BiSolidXSquare className= "delete-set" size="30px" color='#fba92c' onClick={() => handleDeleteSet(exerciseIndex)}/>
                        </div>
                      ))}
                    </div>
                    
                    <div className="addSet">
                      <BiSolidPlusSquare size="30px" color="#fba92c" onClick={() => handleAddSet(exerciseIndex)}/>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}


export default PageTraining
