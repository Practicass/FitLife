
import { useEffect, useState } from "react";

import "../css/PageStats.css"
import { Global } from "../helpers/Global";
import ReactApexChart from "react-apexcharts"


const Stat1 = () => {

    const [stats, setStats] = useState([{}])
    const [y, setY] = useState([])



    const getValues = async() => {

      const request = await fetch(Global.url + "stat/trainings/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")
              
            }
      })

      const data = await request.json()

      let aux =[{}]
      for( let i=0; i<6;i++){
        aux[i] = {
          x: data.stats.mesNombre[i],
          y: data.stats.mes[i]
        };
      }
//
      ////console.log("hola", aux)
//
      setStats(aux)
      setY(data.stats.mes)

    }

    useEffect(()=> {
      getValues()
    }, [])
    


    let state = {
      series: [{
        name: "sales",
        data: stats
      }],
      options: {
        chart: {
          type: 'bar',
          height: "100%",
          foreColor: '#ffffff',
          toolbar: {
            show:false
          }
        },
        colors: ['#fba92c', '#545454'],
        title: {
            text: 'Entrenamientos de los últimos 6 meses',
            align: 'center'
        },
        yaxis: {
          title: {
            text: 'Value'
          },
          min: Math.max(Math.min(...y) -1, 0),
          max: Math.max(...y) +1,
          forceNiceScale: true,
          
        },
        tooltip:{
          enabled: false
        }
        
      },
    }


      return (
        <div className="stat">
             <ReactApexChart options={state.options} series={state.series} type="bar" />
        </div>
       
      );
    
  }

export default Stat1
