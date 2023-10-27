import React, { useState } from "react";
import Sidebar from './Sidebar'
import Logo from './Logo'
import "../css/PageProfile.css"
// import {IoSettingsOutline} from "react-icons/fa"


 const ProfilePage = () => {
  const [sidebar, setSidebar] = useState(false)
  return (
    <div className={"page-"+sidebar}>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
      <div className="header">
      <Logo/>
      </div>
      <div>
        {/* <IoSettingsOutline /> */}
      </div>

    </div>

  )
};


export default ProfilePage