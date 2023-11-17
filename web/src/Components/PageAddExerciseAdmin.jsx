import IconDropdownAdmin from "./IconDropdownAdmin";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import "../css/PageAddExerciseAdmin.css"
import {ImCross} from "react-icons/im"

 const PageAddExerciseAdmin = () => {

  const styleTitle = {
    "fontSize":"60px",
    "color":"#fba92c", 
    "fontWeight":"bolder",
    "marginLeft": "100px"
}
const style5 = { "fontSize": "40px", "fontWeight":"bolder", "color":"#242424"}
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
             <h1 style={styleTitle}>NUEVO EJERCICIO</h1>
         </div>
         <div className="buttonArea-adminAddExercise">
                <NavLink to={-1}><button className="button-adminAddExercise"style={style5}>AÑADIR</button></NavLink>
            </div>
         
           

     </div>

 </div>

  )
}


export default PageAddExerciseAdmin