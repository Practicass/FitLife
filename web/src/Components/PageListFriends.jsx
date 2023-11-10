import React from "react"
import { useState } from 'react'
import { useEffect } from 'react'
import Sidebar from "./Sidebar"
import Header from "./Header"
import { FaUserCircle } from "react-icons/fa"
import {ImCross} from "react-icons/im"
import "../css/PageListFriends.css"
import { Global } from "../helpers/Global"

const PageListFriends = () => {
    
    const[sidebar,setSidebar] = useState(false)
    const[friends, setFriends] = useState([])
    const getFriendList = async() => {
        const request = await fetch(Global.url+'user/friends')
        if (request.ok) {
            const data = await request.json()
            setFriends(data.friends)
        } 
    }

    useEffect(() => {
        getFriendList();
    }, []);

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
                    <div className="ListFriends">
                        {friends.map( friend => {
                            <div className='friend' >
                                <div className="foto-friend">
                                    <FaUserCircle color='#fba92c' size="50px"/>
                                </div>
                                <h2 className="nick-friend"> Pablo </h2>
                                <div className="cruz">
                                    <ImCross size="25px"/>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageListFriends
