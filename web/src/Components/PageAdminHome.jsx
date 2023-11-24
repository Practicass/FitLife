import IconDropdownAdmin from "./IconDropdownAdmin";
import Logo from "./LogoAdmin";
import "../css/PageAdminHome.css"

import { NavLink } from "react-router-dom";
import ExercisesListAdmin from "./ExercisesListAdmin";
import { ScrollShadow } from "@nextui-org/react";
import RoutinesListAdmin from "./RoutinesListAdmin";


 const PageAdminHome = () => {

    const styleTitle = {
        "fontSize":"60px",
        "color":"#fba92c", 
        "fontWeight":"bolder",
        "marginLeft": "100px"
    }
    const style5 = { "fontSize": "40px", "fontWeight":"bolder", "color":"#242424"}

  return (
    <div className="page-adminHome">
       <div className="header-adminHome">
            <div className="logo-adminHome">
                <div className ="logoAdmin"><Logo/></div>
                
            </div>
            <div className="drop-adminHome"><IconDropdownAdmin /></div>

       </div>
       <div className="bodyAdmin">
            <div className="body1Admin">
                <h1 style={styleTitle}>EJERCICIOS</h1>
            </div>
            <div className="body2Admin">
                <h1 style={styleTitle}>RUTINAS</h1>
            </div>
            <div className="rectangle1-admin">
                <ScrollShadow   size="0" className="w-[450px] h-[490px] inline-block">
                    <ExercisesListAdmin />
                </ScrollShadow>
            </div>        
            <div className="rectangle2-admin">
                <ScrollShadow   size="0" className="w-[450px] h-[490px] inline-block">
                    <RoutinesListAdmin />
                </ScrollShadow>
                </div>
            <div className="buttonArea1-admin">
                <NavLink to="addExercise"><button className="button1-admin"style={style5}>AÑADIR</button></NavLink>
            </div>
            <div className="buttonArea2-admin">
                <NavLink to="addRoutine"><button className="button2-admin"style={style5}>AÑADIR</button></NavLink>
            </div>

        </div>


    </div>
  );
};

export default PageAdminHome;