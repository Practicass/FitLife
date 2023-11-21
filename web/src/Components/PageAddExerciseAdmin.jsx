import IconDropdownAdmin from "./IconDropdownAdmin";
import Logo from "./LogoAdmin";
import { NavLink } from "react-router-dom";
import "../css/PageAddExerciseAdmin.css"
import {ImCross} from "react-icons/im"

import { useEffect, useState } from "react";
import { Global } from '../helpers/Global'

import { CheckboxGroup, Checkbox } from "@nextui-org/react";
// import { MyCheckbox } from "./MyCheckbox";

 const PageAddExerciseAdmin = () => {

const [muscles, setMuscles] = useState([])

  const getMuscles = async() => {

    const request = await fetch(Global.url+"muscle/muscles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")

          }
    })

    const data = await request.json()

    console.log(data.muscles)

    setMuscles(data.muscles)
    // return data.exercises;




}
useEffect(() => {

  getMuscles()

}, [])

const style4 = {
  "color" : "#fff",
  "fontWeight" : "bolder",

}

  const styleTitle = {
    "fontSize":"60px",
    "color":"#fba92c", 
    "fontWeight":"bolder",
    "marginLeft": "6.5%"
}
const styleTitle2 = {
  "fontSize":"30px",
  "color":"#fff", 
  "fontWeight":"bolder",
  "marginLeft": "10%"
}

const style5 = { "fontSize": "40px", "fontWeight":"bolder", "color":"#242424"}


// const style1 = { "fontSize": "20px", "fontWeight":"bolder", "color":"#242424"}
  return (
    
    <div className="page-adminAddExercise">
    <div className="header-adminAddExercise">
    <NavLink to={-1}><ImCross className="cross-settings"size="35px" color='#fba92c'/></NavLink>
         <div className="logo-adminAddExercise">
             <div className ="logoAdminAddExercise"><Logo/></div>
             
         </div>
         <div className="drop-adminAddExercise"><IconDropdownAdmin /></div>

    </div>
    <div className="bodyAdminAddExercise">
         <div className="body1AdminAddExercise">
             <h1   style={styleTitle}>NUEVO EJERCICIO</h1>
             {/* <button className="body1AdminAddExerciseButton"style={style1}>Eliminar ejercicio</button> */}

         </div>
         <div className="body2AdminAddExercise">
            <h1 style={styleTitle2}>NOMBRE</h1>
            <input className="inputBody2" />
         </div>
         <div className="body3AdminAddExercise">
            <h1 style={styleTitle2}>GRUPO MUSCULAR</h1>
            <div className="musculos">
            
              <CheckboxGroup
                
                orientation="horizontal"
                color="warning"
                size="lg"
                
              >
                  { muscles.map((muscles) => {
                      return(
        
                        <Checkbox style={style4} value={muscles.name} key={muscles._id}>{muscles.name}&nbsp;&nbsp;&nbsp;</Checkbox>
                    )
                  } )}
        </CheckboxGroup>
       
            </div>
           
         </div>
         <div className="body4AdminAddExercise">
            <h1 style={styleTitle2}>DESCRIPCIÓN</h1>
            <textarea  className="inputBody4" />
         </div>
         <div className="buttonArea-adminAddExercise">
                <NavLink to={-1}><button className="button-adminAddExercise"style={style5}>AÑADIR</button></NavLink>
            </div>
         
           

     </div>

 </div>

  )
}


export default PageAddExerciseAdmin