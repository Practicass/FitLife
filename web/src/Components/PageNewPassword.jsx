import Logo from "./Logo";
import "../css/PageNewPassword.css"
import { useState } from "react";
import { Global } from '../helpers/Global'
import { useNavigate } from "react-router-dom";


 const PageNewPassword = () => {
    const [inputValue1, setInputValue1] = useState('')
const [inputValue2, setInputValue2] = useState('')
const [inputValue3, setInputValue3] = useState('')
const navigate = useNavigate()



const onInputChange1 = ({target}) =>{

    setInputValue1(target.value)
}
const onInputChange2 = ({target}) =>{

  setInputValue2(target.value)
}
const onInputChange3 = ({target}) =>{

    setInputValue3(target.value)
  }

const updateUserPassword = async(e) => {
    // Para que no se recargue la pagina
    e.preventDefault();

    
    const cambio = {
        email: inputValue3,
      password: inputValue1
    }
    const request = await fetch(Global.url+"user/update", {
    method: "PUT",
    body: JSON.stringify(cambio.password),
    headers: {
        "Content-Type":"application/json"
    }
    })

    const data = await request.json()

    console.log(data)

    if(data.status == "success"){

        navigate("/login")
    }else{
    console.log("ERROR")
    
    }

}


const newP = (e) => {
    if(inputValue1 === inputValue2){
        updateUserPassword(e)
    }
}

    const style1 = {

        "color":"#fba92c", 
        "fontWeight":"bolder",
        "marginTop" : "2%"

    }
    const styleTitle2 = {
        "fontSize":"30px",
        "color":"#fff",
        "fontWeight":"bolder",
        "marginLeft": "10%"
      }
      const style5 = { "fontSize": "40px", "fontWeight":"bolder", "color":"#242424"}
  return (
    <div className="page-newPass">
    <div className="header-newPass">
         <div className="logo-newPass">
             <div className ="logonewPass"><Logo/></div>
             
         </div>


    </div>
    <div className="bodynewPass">
         <div className="rectangleNewPass">
            <h1 style={style1} className="text-2xl lg:text-5xl"> RESTABLECER CONSTRASEÑA </h1>
            <div>
            <h1 style={styleTitle2}>EMAIL </h1>
            <input className="input1" onChange={onInputChange3}/>
            </div>
            <div>
            <h1 style={styleTitle2}>NUEVA CONTRASEÑA</h1>
            <input className="input1" onChange={onInputChange1}/>
            </div>
            <div>
            <h1 style={styleTitle2}>REPITA LA NUEVA CONTRASEÑA</h1>
            <input className="input1" onChange={onInputChange2} />
            
            </div>
                <div className="buttonA"><button className="button"style={style5} onClick={newP}>RESTABLECER</button></div>
         </div>
     </div>


 </div>
  )

};


export default PageNewPassword