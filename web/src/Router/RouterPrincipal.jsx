import React from 'react'
import { useState } from 'react'
import {Route, BrowserRouter, Link, Routes} from "react-router-dom"
import PageLogin from '../Components/PageLogin'
import { AuthProvider } from '../context/AuthProvider'
import PageHome2 from '../Components/PageHome'
import PageHistory from '../Components/PageHistory'
import PageRegister from '../Components/PageRegister'
import PageRoutines from '../Components/PageRoutines'
import PageAddRoutine from '../Components/PageAddRoutine'
import PageRoutine from '../Components/PageRoutine'
import PageProfile from '../Components/PageProfile'
import PageStats from '../Components/PageStats'
import PageListFriends from '../Components/PageListFriends'
import PageSettings from '../Components/PageSettings'
import PageNuevaRutina from '../Components/PageNuevaRutina'
import PageEjercicios from '../Components/PageEjercicios'
import PageTraining from '../Components/PageTraining'
import PageStat from "../Components/PageStat"
import PageShowTraining from "../Components/PageShowTraining"


const RouterPrincipal = () => {
  const [ejercicios, setEjercicios] = useState(() => {
    try {
      const storedEjercicios = localStorage.getItem('ejercicios')
      return storedEjercicios ? JSON.parse(storedEjercicios) : []  
    } catch (error) {
      console.error("Error al analizar JSON desde localStorage: ", error)
      return []
    }
  })
    return (
      <BrowserRouter >
        <AuthProvider>
          <Routes>
              <Route path='/' element={<PageLogin/>}/>
              <Route path='/login' element={<PageLogin/>}/>
              <Route path='/home' element={<PageHome2/>}/>
              <Route path='/history' element={<PageHistory/>}/>
              <Route path='/register' element={<PageRegister/>}/>
              <Route path='/routines' element={<PageRoutines/>}/>
              <Route path='/addRoutine' element={<PageAddRoutine/>}/>
              <Route path='/routine' element={<PageRoutine/>}/>
              <Route path='/profile' element={<PageProfile/>}/>
              <Route path='/stats' element={<PageStats/>}/>
              <Route path='/stats/:num' element={<PageStat/>}/>
              <Route path='/friends' element={<PageListFriends/>}/>
              <Route path='/profile/settings' element={<PageSettings/>}/>
              <Route path='/newroutine' element={<PageNuevaRutina ejercicios={ejercicios} setEjercicios={setEjercicios}/>}/>
              <Route path='/exercises' element={<PageEjercicios ejercicios={ejercicios} setEjercicios={setEjercicios}/>}/>
              <Route path='/showTraining/:id' element={<PageShowTraining/>}/>
              <Route path='/training/:id' element={<PageTraining/>}/>

                {/* <Footer/> */}
                <Route path="*"  element ={
                    <>
                        
                      <h1>Error 404</h1>
                      <Link to="/">Volver al inicio</Link>
                        

                    </>
                }/>
            </Routes>
        </AuthProvider>
  
      </BrowserRouter>
    )
  }
  
  export default RouterPrincipal