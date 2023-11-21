

import React from 'react'
import "../css/PageStats.css"
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {ImCross} from "react-icons/im"
import useAuth from '../hooks/useAuth'
import { Global } from '../helpers/Global'


const PageStat = () => {

    const params = useParams()
    const num = params.num

    const StatComponent = React.lazy(() => import(/* @vite-ignore */`./Stat${num}`));
    const {auth} = useAuth()

    const validarNumero = (e) => {
      // Obtener el código de la tecla pulsada
      const codigoTecla = e.which || e.keyCode;
  
      // Permitir teclas de control como Enter y retroceso
      if (e.ctrlKey || e.altKey || codigoTecla < 32) {
        return;
      }
  
      // Asegurarse de que solo se introduzcan números
      if (codigoTecla < 48 || codigoTecla > 57) {
        e.preventDefault();
      }
      const valorInput = e.target.value;
      if (valorInput.length >= 3) {
        e.preventDefault();
      }
    };

    const saveInfo = async(event) => {
      event.preventDefault()
      const value = event.target.newMetrica.value;
    
      if (parseInt(value, 10) > 999) {
        return;
      }
  
      //setMetrica(value);
      console.log(value);
      let category
      
      if(num == 1){
        category = "Weight"
        
        
      }
      const request = await fetch(Global.url + "stat/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
            
          },
          body: JSON.stringify({
            "user": auth._id,
            "value": value,
            "name": category
          })

        })
      const data = await request.json()
      console.log(data.status)
    }


  return (
    <div className={"page"}>
      <NavLink to="/stats"><ImCross size="35px" className='cancelar-stat' color='#fba92c'/></NavLink> 
      
        <div className='principal-stat1'>
            <div className='stat1'>
              <React.Suspense>
                <StatComponent />
              </React.Suspense>
            </div>
            {num == 1 && 
              (<form className='newMetrica' onSubmit={(e) => saveInfo(e)}>
                <input type='number' name="newMetrica" min="1" max="999" onKeyDown={validarNumero} ></input>
                <input type='submit'  value="INTRODUCIR MÉTRICA"></input>
              </form>)
            }
        </div>

    </div>
  )
}



export default PageStat