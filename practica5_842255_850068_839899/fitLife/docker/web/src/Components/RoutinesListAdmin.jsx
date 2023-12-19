import { useEffect, useState } from 'react'
import { Global } from '../helpers/Global'
import "../css/RoutinesListAdmin.css"
import { MyButton } from "./MyButton";
import { NavLink, useNavigate } from 'react-router-dom';


 const RoutinesListAdmin = () => {
  const navigate = useNavigate();

  const [routines, setRoutines] = useState([])
  const getRoutines = async() => {

    const request = await fetch(Global.url+"rutine/rutinesScroll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
            
          }
    })

    const data = await request.json()

    //console.log(data.rutines)
    setRoutines(data.rutines)

    

    
}

useEffect(() => {

  getRoutines()

}, [])

  return (
    <div className="routinesScroll">
    
      <div>
        <ul className='ul-adminRo'>
          { routines.map((routine,index) => {
            if (routine.user.rol == "admin"){
              return(
                <li className='li-adminRo' key={index}>

                    <MyButton color="orange" key={routine._id} className='boton-adminRutina'onClick={() => navigate(`editRoutine/${routine._id}`)}>{routine.name}</MyButton>

                </li>
              )
            }
          })}
        </ul>
      </div>
  </div>
  )
}

export default RoutinesListAdmin