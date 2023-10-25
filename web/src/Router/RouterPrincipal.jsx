import React from 'react'
import {Route, BrowserRouter, Link, Routes} from "react-router-dom"
import PageLogin from '../Components/PageLogin'
import { AuthProvider } from '../context/AuthProvider'
import PageHome from '../Components/PageHome'
import PageHistory from '../Components/PageHistory'
import PageRegister from '../Components/PageRegister'



const RouterPrincipal = () => {
    return (
      <BrowserRouter >
        <AuthProvider>
          <Routes>
              <Route path='/login' element={<PageLogin/>}/>
              <Route path='/home' element={<PageHome/>}/>
              <Route path='/history' element={<PageHistory/>}/>
              <Route path='/register' element={<PageRegister/>}/>
          
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