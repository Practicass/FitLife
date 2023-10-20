import React from 'react'
import {Route, BrowserRouter, Link, Routes} from "react-router-dom"
import PagLogin from '../Components/PagLogin'



const RouterPrincipal = () => {
    return (
      <BrowserRouter >
          <Routes>
              <Route path='/login' element={<PagLogin/>}/>

          
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
  
      </BrowserRouter>
    )
  }
  
  export default RouterPrincipal