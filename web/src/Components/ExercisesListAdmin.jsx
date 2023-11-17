import { useEffect, useState } from 'react'
import { Global } from '../helpers/Global'

 const ExercisesListAdmin = () => {

  const [exercises, setExercises] = useState({})
  const getExercises = async() => {

    const request = await fetch(Global.url+"exercise/exercises", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")

          }
    })

    const data = await request.json()



    return data;




}
useEffect(() => {
 setExercises( getExercises())
// getExercises()

}, [])

  return (
    <div>{exercises.map}</div>
    // <></>
  )
}

export default ExercisesListAdmin