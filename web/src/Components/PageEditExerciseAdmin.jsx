import IconDropdownAdmin from "./IconDropdownAdmin";
import Logo from "./LogoAdmin";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../css/PageEditExerciseAdmin.css"
import {ImCross} from "react-icons/im"

import { useEffect, useState } from "react";
import { Global } from '../helpers/Global'

import { RadioGroup, Radio } from "@nextui-org/react";

// import { MyCheckbox } from "./MyCheckbox";

 const PageEditExerciseAdmin = () => {

    const {id} = useParams()
    console.log(id)
    const navigate = useNavigate()
    const [muscles, setMuscles] = useState([])
    const [inputValue1, setInputValue1] = useState('') 
    const [inputValue2, setInputValue2] = useState('') 
    const [selected, setSelected] = useState([]);
    

    const onInputChange1 = ({target}) =>{
        
        setInputValue1(target.value)
        console.log(inputValue1)
        
    }
    const onInputChange2 = ({target}) =>{
      
      setInputValue2(target.value)
      console.log(inputValue2)
      
      

    }
//---------------------------------------------------------------------------------------
//-----------------------LLAMADAS A LA API------------------------------------------------
//---------------------------------------------------------------------------------------
      const getMuscles = async() => {

        const request = await fetch(Global.url+"muscle/muscles", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")

              }
        })

        const data = await request.json()



        setMuscles(data.muscles)

    }
    const getExercise = async() => {

      const request = await fetch(Global.url+"exercise/exerciseById/"+id, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")
  
            }
      })
  
      const data = await request.json()
  
      // console.log(data)
  
      setInputValue1(data.exercises.name)
      setInputValue2(data.exercises.description)
      setSelected(data.exercises.muscle)
      // exercise.name =  data.exercises.name
      // console.log(`Input11: ${inputValue1}, name: ${exercise.name}`)
      
  
  }
  


    const edit = async(e) => {
      // Para que no se recargue la pagina
      e.preventDefault();

      
      const cambios = {
        name: inputValue1,
        description: inputValue2,
        muscle: selected
      }
      console.log(cambios)

      const request = await fetch(Global.url+"exercise/update/"+id, {
      method: "PUT",
      body: JSON.stringify(cambios),
      headers: {
          "Content-Type":"application/json",
          "Authorization": localStorage.getItem("token")
      }
      })

      const data2 = await request.json()

      console.log(data2)

      if(data2.status == "success"){
          navigate(-1)
          
      }else{
      console.log("ERROR")
      
      }

    }

    const editExercise = (e) => {
      
        edit(e)
      
    }

    const deleteExercise = async(e) => {
      e.preventDefault()
      console.log(id)
      

      const request = await fetch(Global.url+"exercise/eliminate/"+ id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
            
          }
    })

    const data = await request.json()

    console.log(data.status)

      if(data.status == "success"){
          navigate(-1)
      }

    }
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

    useEffect(() => {

      getMuscles()
      getExercise()
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


    const style1 = { "fontSize": "20px", "fontWeight":"bolder", "color":"#242424"}
  return (
    
        <div className="page-adminEditExercise">
          
        <div className="header-adminEditExercise">
        <NavLink to={-1}><ImCross className="cross-settings"size="35px" color='#fba92c'/></NavLink>
            <div className="logo-adminEditExercise">
                <div className ="logoAdminEditExercise"><Logo/></div>
                
            </div>
            <div className="drop-adminEditExercise"><IconDropdownAdmin /></div>

        </div>
        <div className="bodyAdminEditExercise">
            <div className="body1AdminEditExercise">
                <h1   style={styleTitle}>EDITAR EJERCICIO</h1>
                <button className="body1AdminEditExerciseButton" onClick={deleteExercise} style={style1}>Eliminar ejercicio</button>

            </div>
            <div className="body2AdminEditExercise">
                <h1 style={styleTitle2}>NOMBRE</h1>
                <input  value={inputValue1}className="inputBody2" onChange={onInputChange1}/>
            </div>
            <div className="body3AdminEditExercise">
                <h1 style={styleTitle2}>GRUPO MUSCULAR</h1>
                <div className="musculos">

                  <RadioGroup
                    
                    orientation="horizontal"
                    color="warning"
                    size="lg"
                    onValueChange={setSelected}
                    value={selected}
                    
                  >
                      { muscles.map((muscles) => {
                          return(
            
                            <Radio style={style4} value={muscles._id} key={muscles._id}>{muscles.name}&nbsp;&nbsp;&nbsp;</Radio>
                        )
                      } )}
            </RadioGroup>
            
          
                </div>
              
            </div>
            <div className="body4EditAddExercise">
                <h1 style={styleTitle2}>DESCRIPCIÓN</h1>
                <textarea value={inputValue2} className="inputBody4" onChange={onInputChange2} />
            </div>
            <div className="buttonArea-adminEditExercise">
                    <button className="button-adminEditExercise"style={style5} onClick={editExercise}>EDITAR</button>
                </div>
            
              

        </div>

    </div>

  )
}




export default PageEditExerciseAdmin