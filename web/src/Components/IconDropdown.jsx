import React from "react";
// import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, extendVariants} from "@nextui-org/react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import {useAuth} from "../hooks/useAuth"
import {FaUserCircle} from "react-icons/fa"
import { NavLink } from "react-router-dom";



export default function IconDropdown() {
  const {auth} = useAuth()

  return (
   

    <Dropdown radius="sm"
    classNames={{
      base: "p-0 border-small border-divider bg-background",
      arrow: "bg-default-200",
    }}>
      <DropdownTrigger>
        <button className= "button-icon">
          {auth.imagen = "default.png" ? 
              <FaUserCircle color='#fba92c' size="50px" stroke="0"/> 
          : <img src={auth.imagen}/>}
        </button >
      </DropdownTrigger>
      <DropdownMenu
       aria-label="Action event example"  >
        <DropdownItem key="profile"><NavLink to="/profile" style={() => {
    return {
      alignSelf: "center",
      color:"white",
      viewTransitionName:  "slide",
    };
  }}>Mi perfil</NavLink></DropdownItem>
        <DropdownItem key="settings"><NavLink to="/profile" style={() => {
    return {
     
      color:"white",
      viewTransitionName:  "slide",
    };
  }}>Ajustes</NavLink></DropdownItem>
        <DropdownItem key="logOut" ><NavLink to="/profile" style={() => {
    return {
      fontWeight:"bold",
      color:"red",
      viewTransitionName:  "slide",
    };
  }}>Cerrar sesión</NavLink></DropdownItem>
        
      </DropdownMenu>
    </Dropdown>
  );
}




