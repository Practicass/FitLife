import React from "react";
import Sidebar from './Sidebar'

export const ProfilePage = () => {
  return (
    <div className={"page-"+sidebar}>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
    </div>
  )
};
