import React from "react"
import { useState } from 'react'
import { useEffect } from 'react'
import Sidebar from "./Sidebar"
import Header from "./Header"
import { FaUserCircle } from "react-icons/fa"
import {ImCross} from "react-icons/im"
import "../css/PageListFriends.css"
import { Global } from "../helpers/Global"
import { MyButton } from "./MyButton"

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

    const eliminarAmigo = async (idAmigo) => {
        try {
            await fetch(Global.url+'friend/eliminate/' + idAmigo, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            })
            window.location.reload()
        } catch (error) {
            console.error("No se pudo eliminar el amigo: ", error)
        }
    }

    const [busqueda, setBusqueda] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [showFriends, setShowFriends] = useState(true)

    const search = async(e) => {
        setBusqueda(e)
        if (e !== '') {
            setShowFriends(false)

            try {
                const response = await fetch(Global.url + "user/searchUsers/" + e, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }    
                })
                const data = await response.json()

                if (data.status === "success") {
                    setSearchResults(data.users)
                }
                else {
                    console.error("Error en la busqueda: ", data.message)
                }
            } catch (error) {
                console.error("Error en la busqueda", error)
            }
        }
        else {
            setShowFriends(true)
        }
    }

    const anadirAmigo = async(idFriend) => {
        console.log(idFriend)
        try {
            await fetch(Global.url + "friend/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    friend: idFriend
                })
            })
            window.location.reload()
        } catch (error) {
            console.error("Error al añadir el amigo: ", error)
        }
    }

    return (
        <div className={"page-"+sidebar}>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <div className='content'>
                <Header/>
                <h1 className="titulo-list-friends"> MIS AMIGOS </h1>
                <div className="principal-list">
                    <form className="busqueda-form-friends" >
                        {/* Sustituir esto por una búsqueda */}
                        <input 
                            className="busqueda-friends"
                            type="text"
                            name="busqueda"
                            value={busqueda}
                            placeholder="Busca para añadir un amigo..."
                            onChange={(e) => search(e.target.value)}
                            />
                    </form>
                    {showFriends ?
                    <div className="list-friends">
                        {friends.map((friend, index) => {
                            
                            return(
                            <div className='friend' key={index}>
                                <div className="foto-friend">
                                    <FaUserCircle color='#fba92c' size="50px"/>
                                </div>
                                <h2 className="nick-friend"> {friend.name} </h2>
                                <div className="cruz">
                                    <ImCross size="25px" onClick={() => eliminarAmigo(friend._id)}/>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    :
                    <div className="list-friends">
                    {searchResults.map((friend, index) => {
                        console.log(friend)
                        return(
                        <div className='user-not-friend' key={index}>
                            <div className="foto-friend">
                                <FaUserCircle color='#fba92c' size="50px"/>
                            </div>
                            <h2 className="nick-friend"> {friend.name} </h2>
                            <MyButton
                                className="anadir-friend"
                                color="orangeblack"
                                size="xl"
                                type="submit"
                                onClick={() => anadirAmigo(friend._id)}>
                                Añadir
                            </MyButton>
                        </div>
                        )
                    })}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PageListFriends
