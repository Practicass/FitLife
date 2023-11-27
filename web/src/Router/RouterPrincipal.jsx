
import {Route, BrowserRouter, Link, Routes, Navigate} from "react-router-dom"
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
import PageTraining from '../Components/PageTraining'
import PageStat from "../Components/PageStat"
import PageFeed from "../Components/PageFeed"
import PageShowTraining from "../Components/PageShowTraining"

import PageAdminHome from '../Components/PageAdminHome'
import PageAddExerciseAdmin from '../Components/PageAddExerciseAdmin'
import PageAddRoutineAdmin from '../Components/PageAddRoutineAdmin'
import PageEditExerciseAdmin from '../Components/PageEditExerciseAdmin'
import PageEditRoutineAdmin from '../Components/PageEditRoutineAdmin'
import PageEditRoutine from "../Components/PageEditRoutine"
// import PageNewPassword from '../Components/PageNewPassword'
import useAuth from "../hooks/useAuth"
import PageListRequests from "../Components/PageListRequests"



const RouterPrincipal = () => {
    const PrivateRoute = ({ children }) => {
      return !localStorage.getItem('token') ? <Navigate to="/login" /> : children;
    };

    const AdminRoute = ({ children }) => {
      const {auth} = useAuth()
      return !localStorage.getItem('token') ?
        <Navigate to="/login" />
      :
      auth.rol == "usuario" ? <Navigate to="/login" /> : children;
    }
    return (
      <BrowserRouter >
        <AuthProvider>
          <Routes>
              
              <Route path='/' element={<PageLogin/>}/>
              <Route path='/login' element={<PageLogin/>}/>

              <Route path='/home' element={<PrivateRoute><PageHome/></PrivateRoute>}/>

              {/* <Route path='/newPassword' element={<PageNewPassword/>}/> */}

              <Route path='/history' element={<PrivateRoute><PageHistory/></PrivateRoute>}/>
              <Route path='/register' element={<PageRegister/>}/>
              <Route path='/routines' element={<PrivateRoute><PageRoutines/></PrivateRoute>}/>
              <Route path='/addRoutine' element={<PrivateRoute><PageAddRoutine/></PrivateRoute>}/>
              <Route path='/routine' element={<PrivateRoute><PageRoutine/></PrivateRoute>}/>
              <Route path='/profile' element={<PrivateRoute><PageProfile/></PrivateRoute>}/>
              <Route path='/stats' element={<PrivateRoute><PageStats/></PrivateRoute>}/>
              <Route path='/stats/:num' element={<PrivateRoute><PageStat/></PrivateRoute>}/>
              <Route path='/friends' element={<PrivateRoute><PageFeed/></PrivateRoute>}/>
              <Route path='/settings' element={<PrivateRoute><PageSettings/></PrivateRoute>}/>
              <Route path='/listFriends' element={<PrivateRoute><PageListFriends/></PrivateRoute>}/>
              <Route path='/friendrequests' element={<PrivateRoute><PageListRequests/></PrivateRoute>}/>
              <Route path='/newroutine' element={<PrivateRoute><PageNuevaRutina/></PrivateRoute>}/>
              <Route path='/editroutine/:id' element={<PrivateRoute><PageEditRoutine/></PrivateRoute>}/>
              <Route path='/showTraining/:id' element={<PrivateRoute><PageShowTraining/></PrivateRoute>}/>

              <Route path='/newroutine' element={<PrivateRoute><PageNuevaRutina/></PrivateRoute>}/>
              <Route path='/editroutine/:id' element={<PrivateRoute><PageEditRoutine/></PrivateRoute>}/>



              <Route path='/training/:id' element={<PrivateRoute><PageTraining/></PrivateRoute>}/>
      
              <Route path='/adminHome' element={<AdminRoute><PageAdminHome /></AdminRoute>}/>
              <Route path='/adminHome/addExercise' element={<AdminRoute><PageAddExerciseAdmin /></AdminRoute>}/>
              <Route path='/adminHome/editExercise/:id' element={<AdminRoute><PageEditExerciseAdmin /></AdminRoute>}/>
              <Route path='/adminHome/addRoutine' element={<AdminRoute>< PageAddRoutineAdmin/></AdminRoute>}/>
              <Route path='/adminHome/editRoutine/:id' element={<AdminRoute>< PageEditRoutineAdmin/></AdminRoute>}/>


              
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