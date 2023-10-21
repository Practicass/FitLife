import React from 'react'
import {Route, BrowserRouter, Link, Routes} from "react-router-dom"
import PageLogin from '../Components/PageLogin'
import { AuthProvider } from '../context/AuthProvider'
import PageHome from '../Components/PageHome'



const RouterPrincipal = () => {
    return (
      <BrowserRouter >
        <AuthProvider>
          <Routes>
              <Route path='/login' element={<PageLogin/>}/>
              <Route path='/home' element={<PageHome/>}/>

          
                {/* <Footer/> */}
                <Route path="*"  element ={
                    <>
                        <p>
                            <h1>Error 404</h1>
                            <Link to="/">Volver al inicio</Link>
                        </p>

                    </>
                }/>
            </Routes>
        </AuthProvider>
  
      </BrowserRouter>
    )
  }
  
  export default RouterPrincipal