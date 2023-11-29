
import {DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {useAuth} from "../hooks/useAuth"
import {FaUserCircle} from "react-icons/fa"
import { useNavigate } from "react-router-dom";

import { MyDropDown } from "./MyDropDown";


//a veces parece que no funciona pq el navlink esta en el texto y no en el item
// Solucion: Quitar navLink y poner en el Item onAction/onPress y que haga un navigate
// al hacer esto lo mas seguro que se pierda el estilo del color de las letras, por lo tanto 
// se tendra que poner un h1

// export default function IconDropdown() {
//   const {auth} = useAuth()

//   return (


//     <MyDropDown color="grey">
//       <DropdownTrigger>
//         <button className= "button-icon">
//           {auth.image == "default.png" ? 
//               <FaUserCircle className= "button-icon-img"color='#fba92c' size="50px" stroke="0"/> 
//           : <img className="button-icon-img"src={auth.imagen}/>}
//         </button >
//       </DropdownTrigger>
//       <DropdownMenu
//        aria-label="Action event example"  
//        >
//         <DropdownItem color="warning" key="profile" textValue="Mi perfil">
//           <NavLink to="/profile" style={() => {
//             return {
//                 alignSelf: "center",
//                 color:"white",
//                 viewTransitionName:  "slide",
//           };
//   }}>Mi perfil</NavLink></DropdownItem>
//         <DropdownItem color="warning" key="settings"textValue="Ajustes"><NavLink to="/settings" style={() => {
//     return {
//       alignSelf: "center",
//       color:"white",
//       viewTransitionName:  "slide",
//     };
//   }}>Ajustes</NavLink></DropdownItem>
//         <DropdownItem color="danger" key="logOut" textValue="Cerrar sesión"><NavLink to="/login" onClick={()=>{localStorage.removeItem("token");localStorage.removeItem("user")}} style={() => {
//     return {
//       alignSelf: "center",
//       fontWeight:"bold",
//       color:"white",
//       viewTransitionName:  "slide",
//     };
//   }}>Cerrar sesión</NavLink></DropdownItem>
        
//       </DropdownMenu>
//     </MyDropDown>
//   );
// }




export default function IconDropdown() {
  const {auth} = useAuth()
  const navigate = useNavigate()
  const item1 = () => {
      navigate("/profile")
  }
  const item2 = () => {
    navigate("/settings")
  }
const item3 = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  navigate("/login")
  }

  const style = {"color":"#FFF","fontWeight": "bold"}

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
        <DropdownItem color="warning" onClick={item1} key="profile" textValue="Mi perfil"><p style={style}>Mi perfil</p></DropdownItem>
        <DropdownItem color="warning" onClick={item2} key="settings"textValue="Ajustes"><p style={style}>Ajustes</p></DropdownItem>
        <DropdownItem color="danger" onClick={item3} key="logOut" textValue="Cerrar sesión"><p style={style}>Cerrar sesión</p></DropdownItem>
        
      </DropdownMenu>
    </MyDropDown>
  );
}


