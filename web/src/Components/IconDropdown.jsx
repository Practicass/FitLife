
import {DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {useAuth} from "../hooks/useAuth"
import {FaUserCircle} from "react-icons/fa"
import { NavLink } from "react-router-dom";

import { MyDropDown } from "./MyDropDown";




export default function IconDropdown() {
  const {auth} = useAuth()

  return (


    <MyDropDown color="grey">
      <DropdownTrigger>
        <button className= "button-icon">
          {auth.image == "default.png" ? 
              <FaUserCircle className= "button-icon-img"color='#fba92c' size="50px" stroke="0"/> 
          : <img className="button-icon-img"src={auth.imagen}/>}
        </button >
      </DropdownTrigger>
      <DropdownMenu
       aria-label="Action event example"  
       >
        <DropdownItem color="warning" key="profile" textValue="Mi perfil">
          <NavLink to="/profile" style={() => {
            return {
                alignSelf: "center",
                color:"white",
                viewTransitionName:  "slide",
          };
  }}>Mi perfil</NavLink></DropdownItem>
        <DropdownItem color="warning" key="settings"textValue="Ajustes"><NavLink to="/settings" style={() => {
    return {
      alignSelf: "center",
      color:"white",
      viewTransitionName:  "slide",
    };
  }}>Ajustes</NavLink></DropdownItem>
        <DropdownItem color="danger" key="logOut" textValue="Cerrar sesión"><NavLink to="/login" onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("user")}} style={() => {
    return {
      alignSelf: "center",
      fontWeight:"bold",
      color:"white",
      viewTransitionName:  "slide",
    };
  }}>Cerrar sesión</NavLink></DropdownItem>
        
      </DropdownMenu>
    </MyDropDown>
  );
}





// import { DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";

// export default function IconDropdown() {
//   const {auth} = useAuth()
//   return (
//     <MyDropDown color="grey">
//       <DropdownTrigger>
//       <button className= "button-icon">
//           {auth.image == "default.png" ? 
//                <FaUserCircle className= "button-icon-img"color='#fba92c' size="50px" stroke="0"/> 
//            : <img className="button-icon-img"src={auth.imagen}/>}
//         </button > 
//       </DropdownTrigger>
//       <DropdownMenu aria-label="Static Actions">
//         <DropdownItem color="warning" key="profile" textValue="Mi perfil">
//           <NavLink to="/profile">
//             Mi perfil
//           </NavLink>
//         </DropdownItem>
//         <DropdownItem color="warning" key="settings">Ajustes</DropdownItem>
//         <DropdownItem color="danger" key="logOut" className="text-danger">Cerrar sesión</DropdownItem>
//       </DropdownMenu>
//     </MyDropDown>
//   );
// }
