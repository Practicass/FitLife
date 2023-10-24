import React, { useState, createContext, useEffect } from 'react'
import { Global } from '../helpers/Global'

const SidebarContext = createContext()

export const AuthProvider = ({children}) => {

    
    const [auth, setAuth] = useState({});

    useEffect(() => {
        authUser()
    },[])


    const authUser = async() => {

        //console.log("HOLAA")
        

        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")
        

        if(!token || !user){
            return false;
        }

        const userObj= JSON.parse(user)
        const userId = userObj.id
    

        const request = await fetch(Global.url + "user/profile/" +userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const data = await request.json()

        //console.log(data)

        setAuth(data.user)
        

    };

  return (
    <AuthContext.Provider value={{
        auth,
        authUser
    }} >{children}</AuthContext.Provider>
  );
};

export default AuthContext
