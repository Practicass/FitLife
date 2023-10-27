import React from 'react'

const PageStats = () => {
  return (
    <div className={"page-"+sidebar}>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
      <div className='content'>
        <Header/>
        <div className='principal'>
          
        </div>
      </div>
    </div>
  )
}

export default PageStats
