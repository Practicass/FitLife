
import {DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
// import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import {useAuth} from "../hooks/useAuth"
import {FaUserCircle} from "react-icons/fa"
import { NavLink } from "react-router-dom";
// import { color } from "framer-motion";
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
        <DropdownItem color="warning" key="profile"><NavLink to="/profile" style={() => {
    return {
      alignSelf: "center",
      color:"white",
      viewTransitionName:  "slide",
    };
  }}>Mi perfil</NavLink></DropdownItem>
        <DropdownItem color="warning" key="settings"><NavLink to="/settings" style={() => {
    return {
      alignSelf: "center",
      color:"white",
      viewTransitionName:  "slide",
    };
  }}>Ajustes</NavLink></DropdownItem>
        <DropdownItem color="danger" key="logOut" ><NavLink to="/login" onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("user")}} style={() => {
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




