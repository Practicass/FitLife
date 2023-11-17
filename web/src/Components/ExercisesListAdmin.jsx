import { useEffect, useState } from 'react'
import { Global } from '../helpers/Global'

import { MyButton } from "../Components/MyButton";

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

    console.log(data.exercises)

    setExercises(data.exercises)
    // return data.exercises;




}
useEffect(() => {

  getExercises()

}, [])

  return (
    
    <div>{ exercises.map((exercise) => {
      return(
        
        <MyButton color="orange" key={exercise._id}>{exercise.name}</MyButton>
      )
    } )}</div>
    // <></>
  )
}

export default ExercisesListAdmin