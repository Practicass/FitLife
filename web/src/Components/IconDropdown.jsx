import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function IconDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
         {auth.imagen = "default.png" ? 

        <div className='icon-user-default'>
            <FaUserCircle color='#fba92c' size="50px"/> 
        {/* <NavLink to="/me"> <FaUserCircle color='#fba92c' size="50px"/> </NavLink> */}
        </div>
        : <img src={auth.imagen}/>}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}


