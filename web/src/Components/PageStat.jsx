

import React from 'react'
import "../css/PageStats.css"
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {ImCross} from "react-icons/im"


const PageStat = () => {

    const params = useParams()
    const num = params.num

    const StatComponent = React.lazy(() => import(`./Stat${num}`));


  return (
    <div className={"page"}>
      <NavLink to="/stats"><ImCross size="35px" className='cancelar-stat' color='#fba92c'/></NavLink> 
      
        <div className='principal-stat1'>
            <div className='stat1'>
              <React.Suspense>
                <StatComponent />
              </React.Suspense>
            </div>
            {num == 1 && <button className='introducir-metrica'>INTRODUCIR MÉTRICA</button>}
        </div>

    </div>
  )
}



export default PageStat