import { useEffect, useState } from 'react'
import { Global } from '../helpers/Global'
import "../css/RoutinesListAdmin.css"
import { MyButton } from "./MyButton";
import { NavLink } from 'react-router-dom';


 const RoutinesListAdmin = () => {

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
                  <NavLink to={`editRoutine/${routine._id}`}>
                    <MyButton color="orange" key={routine._id} className='boton-adminRutina'>{routine.name}</MyButton>
                  </NavLink>
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