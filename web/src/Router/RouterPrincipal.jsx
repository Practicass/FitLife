import React from 'react'
import {Route, BrowserRouter, Link, Routes} from "react-router-dom"
import { useState } from 'react'
import PageLogin from '../Components/PageLogin'
import { AuthProvider } from '../context/AuthProvider'
import PageHome from '../Components/PageHome'
import PageHistory from '../Components/PageHistory'
import PageRegister from '../Components/PageRegister'
import PageRoutines from '../Components/PageRoutines'
import PageAddRoutine from '../Components/PageAddRoutine'
import PageRoutine from '../Components/PageRoutine'
import PageProfile from '../Components/PageProfile'
import PageStats from '../Components/PageStats'
import PageListFriends from '../Components/PageListFriends'
import PageNuevaRutina from '../Components/PageNuevaRutina'
import PageEjercicios from '../Components/PageEjercicios'
import PageEditRoutine from '../Components/PageEditRoutine'
import PageEjerciciosEdit from '../Components/PageEjerciciosEdit'
// import PageSettings from '../Components/PageSettings'

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

  const [ejerciciosEdit, setEjerciciosEdit] = useState(() => {
    try {
      const storedEjercicios = localStorage.getItem('ejerciciosEdit')
      return storedEjercicios ? JSON.parse(storedEjercicios) : []  
    } catch (error) {
      console.error("Error al analizar JSON desde localStorage: ", error)
      return []
    }
  })

  const [idRutinaEdit, setIdRutinaEdit] = useState(() => {
    try {
      const storedIdRutina = localStorage.getItem('idRutinaEdit')
      return storedIdRutina ? parseInt(storedIdRutina, 10) : null
    } catch (error) {
      console.error("Error al analizar JSON desde localStorage: ", error)
      return null
    }
  })

    return (
      <BrowserRouter >
        <AuthProvider>
          <Routes>
              <Route path='/login' element={<PageLogin/>}/>
              <Route path='/home' element={<PageHome/>}/>
              <Route path='/history' element={<PageHistory/>}/>
              <Route path='/register' element={<PageRegister/>}/>
              <Route path='/routines' element={<PageRoutines/>}/>
              <Route path='/addRoutine' element={<PageAddRoutine/>}/>
              <Route path='/routine' element={<PageRoutine/>}/>
              <Route path='/profile' element={<PageProfile/>}/>
              <Route path='/stats' element={<PageStats/>}/>
              <Route path='/friends' element={<PageListFriends/>}/>
              <Route path='/newroutine' element={<PageNuevaRutina ejercicios={ejercicios} setEjercicios={setEjercicios}/>}/>
              <Route path='/exercises' element={<PageEjercicios ejercicios={ejercicios} setEjercicios={setEjercicios}/>}/>
              <Route path='/editroutine' element={<PageEditRoutine ejercicios={ejerciciosEdit} setEjercicios={setEjerciciosEdit} idRutina={idRutinaEdit}></PageEditRoutine>}/>
              <Route path='/ejerciciosedit' element={<PageEjerciciosEdit ejercicios={ejerciciosEdit} setEjercicios={setEjercicios}></PageEjerciciosEdit>}/>


              {/* <Route path='/profile/settings' element={<PageSettings/>}/> */}

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