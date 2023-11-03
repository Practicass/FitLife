import React from "react"
import { useState } from 'react'
import Sidebar from "./Sidebar"
import Header from "./Header"
import { FaUserCircle } from "react-icons/fa"
import {ImCross} from "react-icons/im"
import "../css/PageListFriends.css"

const PageListFriends = () => {
    
    const[sidebar,setSidebar] = useState(false)

    return (
        <div className={"page-"+sidebar}>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <div className='content'>
                <Header/>
                <div className="principal">
                    <form className="busqueda" >
                        {/* Sustituir esto por una búsqueda */}
                        <input type="text" name="busqueda" />
                    </form>
                    <div className='friend' >
                        <div className="foto-friend">
                            <FaUserCircle color='#fba92c' size="50px"/>
                        </div>
                        <h2 className="nick-friend"> Pablo </h2>
                        <div className="cruz">
                            <ImCross size="25px"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default PageListFriends
