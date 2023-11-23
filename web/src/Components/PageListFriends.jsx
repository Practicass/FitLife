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
        const request = await fetch(Global.url+'friend/friends', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
        })
        if (request.ok) {
            const data = await request.json()

            setFriends(data.friendsIds.friends)
        } 
    }


    useEffect(() => {
        getFriendList()
    }, [])

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
                        {friends.map((friend, index) => (
                            <div className='friend' key={index}>
                                <div className="foto-friend">
                                    <FaUserCircle color='#fba92c' size="50px"/>
                                </div>
                                <h2 className="nick-friend"> {friend.name} </h2>
                                <div className="cruz">
                                    <ImCross size="25px"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageListFriends
