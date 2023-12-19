import { useEffect, useState } from 'react'
import { Global } from '../helpers/Global'
import "../css/ExerciseListAdmin.css"
import { MyButton } from "../Components/MyButton";
import { NavLink,useNavigate } from 'react-router-dom';

 const ExercisesListAdmin = () => {

  const navigate = useNavigate();
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
    <div className="exerciseScroll">
    
      <div>
        <ul className='ul-adminEx'>
          { exercises.map((exercise,index) => {
            return(
              <li className='li-adminEx' key={index}>
               <MyButton onClick={() => navigate(`editExercise/${exercise._id}`)} color="orange" key={exercise._id} className='boton-adminEjercicio'>{exercise.name}</MyButton>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ExercisesListAdmin