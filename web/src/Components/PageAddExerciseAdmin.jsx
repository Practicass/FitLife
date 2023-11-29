import IconDropdownAdmin from "./IconDropdownAdmin";
import Logo from "./LogoAdmin";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/PageAddExerciseAdmin.css"
import {ImCross} from "react-icons/im"

import { useEffect, useState } from "react";
import { Global } from '../helpers/Global'

import { RadioGroup, Radio } from "@nextui-org/react";
// import { MyCheckbox } from "./MyCheckbox";

 const PageAddExerciseAdmin = () => {
  const navigate = useNavigate()
const [muscles, setMuscles] = useState([])
const [inputValue1, setInputValue1] = useState('')
const [inputValue2, setInputValue2] = useState('')
const [selected, setSelected] = useState([]);

const onInputChange1 = ({target}) =>{

    setInputValue1(target.value)
}
const onInputChange2 = ({target}) =>{

  setInputValue2(target.value)
}



  const getMuscles = async() => {

    const request = await fetch(Global.url+"muscle/muscles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")

          }
    })

    const data = await request.json()

    //console.log(data.muscles)

    setMuscles(data.muscles)
    // return data.exercises;
}



const add = async(e) => {
  // Para que no se recargue la pagina
  e.preventDefault();


  const cambios = {
    name: inputValue1,
    description: inputValue2,
    muscle: selected
  }

  const request = await fetch(Global.url+"exercise/add", {
  method: "POST",
  body: JSON.stringify(cambios),
  headers: {
      "Content-Type":"application/json",
      "Authorization": localStorage.getItem("token")
  }
  })

  const data = await request.json()

  //console.log(data)

  if(data.status == "success"){

    // localStorage.setItem("user", JSON.stringify(data.user._id));

      navigate(-1)

  }else{
  //console.log("ERROR")

  }

}

const addExercise = (e) => {
  if (inputValue1 !== "" && inputValue2 !== "" && selected.length !== 0) {
    add(e)
  }
}

useEffect(() => {

  getMuscles()

}, [])

const style4 = {
  "color" : "#fff",
  "fontWeight" : "bolder",

}

  const styleTitle = {
    //"fontSize":"60px",
    "color":"#fba92c",
    "fontWeight":"bolder",
    "marginLeft": "6.5%"
}
const styleTitle2 = {
  //"fontSize":"30px",
  "color":"#fff",
  "fontWeight":"bolder",
  "marginLeft": "10%"
}

const style5 = { //"fontSize": "40px", 
                "fontWeight":"bolder", 
                    "color":"#242424"}


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
             <h1 className='text-4xl lg:text-6xl'  style={styleTitle}>NUEVO EJERCICIO</h1>
             {/* <button className="body1AdminAddExerciseButton"style={style1}>Eliminar ejercicio</button> */}

         </div>
         <div className="body2AdminAddExercise">
            <h1 style={styleTitle2} className='text-2xl lg:text-3xl'>NOMBRE</h1>
            <input className="inputBody2" onChange={onInputChange1}/>
         </div>
         <div className="body3AdminAddExercise">
            <h1  className='text-2xl lg:text-3xl'style={styleTitle2}>GRUPO MUSCULAR</h1>
            <div className="musculos">

              <RadioGroup

                orientation="horizontal"
                color="warning"
                size="lg"
                onValueChange={setSelected}

              >
                  { muscles.map((muscles) => {
                      return(

                        <Radio style={style4} value={muscles._id} key={muscles._id}>{muscles.name}&nbsp;&nbsp;&nbsp;</Radio>
                    )
                  } )}
        </RadioGroup>
        {/* <p className="text-default-500 text-small">Selected: {selected}</p> */}

            </div>

         </div>
         <div className="body4AdminAddExercise">
            <h1 style={styleTitle2} className='text-2xl lg:text-3xl'>DESCRIPCIÓN</h1>
            <textarea  className="inputBody4" onChange={onInputChange2} />
         </div>
         <div className="buttonArea-adminAddExercise">
             <button className="button-adminAddExercise text-base lg:text-3xl "style={style5} onClick={addExercise}>AÑADIR</button>
            </div>



     </div>

 </div>

  )
}




export default PageAddExerciseAdmin