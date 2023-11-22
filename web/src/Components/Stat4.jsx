
import { useEffect, useState } from "react";

import "../css/PageStats.css"
import { Global } from "../helpers/Global";
import ReactApexChart from "react-apexcharts"


const Stat4 = () => {

    const [stats, setStats] = useState([])
    const [goal, setGoal] = useState(480)
    let statsHM = []




    const getValues = async() => {

      const request = await fetch(Global.url + "stat/statsLastFive/Asleep", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")
              
            }
      })

      const data = await request.json()

      let aux =[{}]
      for( let i=0; i<data.stats.length;i++){
        aux[i] = (data.stats[i].value/goal)*100
        statsHM[i] = data.stats[i].value
      }
//
      console.log("hola", aux, statsHM)
//
      setStats(aux)


    }

    useEffect(()=> {
      getValues()
    }, [])
    

    let state = {
          
      series: stats,
      options: {
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px',
                color: "white",
              },
              value: {
                fontSize: '16px',
                color: "white",
              },
              total: {
                show: true,
                label: 'Media',
                color: "white",
                formatter: function () {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 249
                }
              },
              max: 300,
            }
            ,
          }
        },
        labels: [statsHM],
        
      },
    
    
    };
  


      return (
        <div className="stat">
             <ReactApexChart options={state.options} series={state.series} type="radialBar" width="86%"/>
        </div>
       
      );
    
  }

export default Stat4
