import React from 'react'
import Header from './Header'
import {useAuth} from "../hooks/useAuth"

const PageHome = () => {
  const {auth} = useAuth()

  //console.log(auth)
  return (
    <div className='pageHome'>
      <Header/>
      <>{auth.name},{auth.image}</>
    </div>
  )
}

export default PageHome
