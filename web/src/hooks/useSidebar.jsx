import React from 'react'
import { useContext } from 'react'

export const useAuth = () => {
  
  return useContext(SidebarContext)
}

export default useAuth