import IconDropdownAdmin from "./IconDropdownAdmin";
import Logo from "./Logo";
import "../css/PageAdminHome.css"

import { NavLink } from "react-router-dom";


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
                <h1 style={styleTitle}>RUITNAS</h1>
            </div>
            <div className="rectangle1-admin"></div>        
            <div className="rectangle2-admin"></div>
            <div className="buttonArea1-admin">
            <NavLink to="/home"><button className="button1-admin"style={style5}>AÑADIR</button></NavLink>
            </div>
            <div className="buttonArea2-admin">
            <NavLink to="/home"><button className="button2-admin"style={style5}>AÑADIR</button></NavLink>
            </div>

        </div>

    </div>
  );
};

export default PageAdminHome;