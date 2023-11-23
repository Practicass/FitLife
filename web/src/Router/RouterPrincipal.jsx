
import { useState } from 'react'
import {Route, BrowserRouter, Link, Routes} from "react-router-dom"
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
import PageSettings from '../Components/PageSettings'
import PageNuevaRutina from '../Components/PageNuevaRutina'
import PageEjercicios from '../Components/PageEjercicios'
import PageTraining from '../Components/PageTraining'
import PageStat from "../Components/PageStat"
import PageAdminHome from '../Components/PageAdminHome'
import PageAddExerciseAdmin from '../Components/PageAddExerciseAdmin'
import PageAddRoutineAdmin from '../Components/PageAddRoutineAdmin'
import PageEditExerciseAdmin from '../Components/PageEditExerciseAdmin'



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
              <Route path='/home' element={<PageHome/>}/>
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

              <Route path='/training/:id' element={<PageTraining/>}/>
      
              <Route path='/adminHome' element={<PageAdminHome />}/>
              <Route path='/adminHome/addExercise' element={<PageAddExerciseAdmin />}/>
              <Route path='/adminHome/editExercise/:id' element={<PageEditExerciseAdmin />}/>
              <Route path='/adminHome/addRoutine' element={< PageAddRoutineAdmin/>}/>
              
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