import React from 'react'
import Sidebar from './Sidebar'
import { useState } from 'react'
import Header from './Header'
import {ImCross} from "react-icons/im"
import {FaRegEdit} from "react-icons/fa"
import { useEffect } from 'react'
import { Global } from '../helpers/Global'


const PageRutines = () => {
    const[sidebar,setSidebar] = useState(false)
    const [rutines, setRutines] = useState([])
    
    const getRutines = async() => {

        const request = await fetch(Global.url+"rutine/rutines", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
                
              }
        })

        const data = await request.json()


        setRutines(data.rutines)

        

        
    }


    useEffect(() => {
        getRutines()
    }, [])

    useEffect(() => {
        console.log(rutines)

      }, [rutines]);
    
    

  return (
    <div className={'page-'+sidebar}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='content'>
            <Header/>
            <div className='principal-rutines'>
                <div className='myRutines-'>
                    <h2>MIS RUTINAS</h2>
                    {/* <div className='rutines'>
                        <div className='square'>
                            <h3 className='title-rutine'>Rutina 1</h3>
                            <div className='cross'><ImCross size="25px" color='#fba92c'/></div>
                            <div className='exercises-rutine'>
                                <div className='exercises-par'>
                                    <label>hola</label>
                                    <label>hola</label>
                                </div>
                                <div className='separator'></div>
                                <div className='exercises-impar'>
                                    <label>hola</label>
                                    <label>hola</label>
                                </div>
                            </div>
                            <div className='edit'><FaRegEdit size="32px" color='#fba92c'/></div>
                        </div> */}
                    {rutines.map( rutine => {


                        return(
                            <div className='rutines' key={rutine._id}>
                                <div className='square'>
                                    <h3 className='title-rutine'>{rutine.name}</h3>
                                    <div className='cross'><ImCross size="25px" color='#fba92c'/></div>
                                    <div className='exercises-rutine'>
                                        <div className='exercises-par'>
                                           
                                        </div>
                                        <div className='separator'></div>
                                        <div className='exercises-impar'>
                                            <label>hola</label>
                                            <label>hola</label>
                                        </div>
                                    </div>
                                    <div className='edit'><FaRegEdit size="32px" color='#fba92c'/></div>
                                </div> 
                            </div>
                        )
                    })}
                    
                </div>
                <div className='popRutines'>
                    <h2>RUTINAS POPULARES</h2>
                    <div className='rutines'>
                        <div className='square'>

                        </div>
                        <div className='square'>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default PageRutines
