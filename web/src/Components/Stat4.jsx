
import { useEffect, useState } from "react";

import "../css/PageStats.css"
import { Global } from "../helpers/Global";
import ReactApexChart from "react-apexcharts"


const Stat4 = () => {

    const [stats, setStats] = useState([])
    const [goal, setGoal] = useState(480)
    const [date, setDate] = useState([])





    const getValues = async() => {

      const request = await fetch(Global.url + "stat/statsLastFive/Asleep", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")
              
            }
      })

      const data = await request.json()

      let aux =[]
      let aux2 = []
      for( let i=0; i<data.stats.length;i++){
        aux[i] = (data.stats[i].value/goal)*100
        let fecha = new Date(data.stats[i].date)
        let numeroMes = fecha.getMonth() + 1;
        let numeroDia = fecha.getDate();
        aux2[i] = numeroDia + '/' + numeroMes;
      }
//
      ////console.log("hola", aux, statsHM)
//
      setStats(aux)
      setDate(aux2)
      ////console.log(aux2)

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
        title:{
          text: 'Sueño',
          align: 'center',
          style:{
            color:'white'
          } 
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '20px',
                color: "white",
              },
              value: {
                fontSize: '16px',
                color: "white",
                formatter: function (value) {
                  let minutos = Math.trunc((value*goal)/100) 
                  let horas = Math.floor(minutos / 60);
                  let minutosRestantes = minutos % 60;
                  return horas+"h "+minutosRestantes+"m"
                }
              },
              total: {
                show: true,
                label: 'Media',
                color: "white",
                formatter: function (values) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  const sum = values.config.series.reduce((acc, value) => acc + value, 0);
                  const average = sum / values.config.series.length;
                  let minutos = Math.trunc((average*goal)/100)
                  let horas = Math.floor(minutos / 60);
                  let minutosRestantes = minutos % 60;
                  return horas+"h "+minutosRestantes+"m"
                }
              },
              
            }
            ,
            track:{
              background:'transparent',
              margin:"1px"
            }
          },
          
        },
        labels: date,
        
      },
    
    
    };
  


      return (
        <div className="stat">
             <ReactApexChart className="stat4" options={state.options} series={state.series} type="radialBar" width="86%"/>
        </div>
       
      );
    
  }

export default Stat4
