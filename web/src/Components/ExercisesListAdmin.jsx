import { useEffect, useState } from 'react'
import { Global } from '../helpers/Global'
import "../css/ExerciseListAdmin.css"
import { MyButton } from "../Components/MyButton";
import { NavLink } from 'react-router-dom';

 const ExercisesListAdmin = () => {

  const [exercises, setExercises] = useState([])
  const getExercises = async() => {

    const request = await fetch(Global.url+"exercise/allExercises", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")

          }
    })

    const data = await request.json()

    //console.log(data.exercises)

    setExercises(data.exercises)
    // return data.exercises;




}
useEffect(() => {

  getExercises()

}, [])

  return (
    
    <div>
      <ul className='ul-adminEx'>

      
      { exercises.map((exercise,index) => {
      return(
        <li className='li-adminEx' key={index}>
         <NavLink to={`editExercise/${exercise._id}`}><MyButton color="orange" key={exercise._id} className='boton-adminEjercicio'>{exercise.name}</MyButton></NavLink>
        </li>
      )
    } )}</ul></div>
    // <></>
  )
}

export default ExercisesListAdmin