import React, { useEffect } from 'react'
import Header from './Header'
import {FaBars} from "react-icons/fa"
import { Global } from '../helpers/Global'
import { useState } from 'react'
import Sidebar from './Sidebar'
import { useNavigate, NavLink } from 'react-router-dom'
import Stat3 from './Stat3'
import Stat4 from './Stat4'
import "../css/PageHome.css"

const PageHome = () => {

  const [sidebar, setSidebar] = useState(false)
  const [routines, setRoutines] = useState([])
  let navigate = useNavigate()

  const getRoutines = async() => {

    const request = await fetch(Global.url+"rutine/favRutines", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
            
          }
    })

    const data = await request.json()

    setRoutines(data.routines)
    
    
  }

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/")
    }else{
      getRoutines()
    }

  },[])
  

  //console.log(auth)
  return (
    <div className={"page-"+sidebar}>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
      <div className='content'>
        <Header/>
        <div className='principal-home'>

                <NavLink to="/stats/3" className="stats"><Stat3/></NavLink>
                <div to="/routines" className="routines-home">
                  {routines.map((routine) =>  {
                      return(
                        <div className='routine-home' key={routine._id}>
                          <label>{routine.name}</label>
                          <button>INICIAR</button>
                        </div>
                      )
                    }
                  )} 
                </div>
                <NavLink to="/stats/4" className="stats"><Stat4/></NavLink>
            
            
            
        </div>
      </div>
    </div>
  ) 
}

export default PageHome
