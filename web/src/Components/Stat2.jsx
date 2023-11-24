import ReactApexChart from "react-apexcharts"
import { useEffect, useState } from "react";

import "../css/PageStats.css"
import { Global } from "../helpers/Global";


const Stat1 = () => {

    const [stats, setStats] = useState({dates: [],values:[]})



    const getValues = async() => {

      const request = await fetch(Global.url + "training/trainingsLast", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")
              
            }
      })

      const data = await request.json()

      let aux=[]
      let aux2=[]

      for( let i=0; i<data.trainings.length;i++){
        let fecha = new Date(data.trainings[i].created_at)
        let numeroMes = fecha.getMonth() + 1;

        let numeroDia = fecha.getDate();
        aux2[i] = numeroDia + "/" + numeroMes;
        let suma = 0
        let hola = data.trainings[i].sets.length
        for( let y=0; y<hola; y++){
          suma += data.trainings[i].sets[y].weight * data.trainings[i].sets[y].reps 
        }
        aux[i] =  suma
      }
//
//
      setStats({dates:aux2, values:aux})
      //console.log(aux)

    }

    useEffect(()=> {
      getValues()
    }, [])
    


    let state = {
        series: [
            {
              data: stats.values
            }
          ],
          options: {
            chart: {

              type: 'line',
              dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
              toolbar: {
                show: false
              },
              foreColor: '#ffffff'
            },
            colors: ['#fba92c', '#545454'],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Peso levantado en últimos entrenamientos',
              align: 'center'
            },
            grid: {
              borderColor: '#ffffff',
              row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            markers: {
              size: 1
            },
            xaxis: {
              categories: stats.dates,
              title: {
                text: 'Date'
              }
            },
            yaxis: {
              title: {
                text: 'Value'
              },
              min: Math.max(Math.min(...stats.values) -1, 0),
              max: Math.max(...stats.values) +1,
              forceNiceScale: true,
              
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            },
            tooltip:{
              enabled: false
            }
          },
    }


      return (
        <div className="stat">
             <ReactApexChart options={state.options} series={state.series} type="line" />
        </div>
       
      );
    
  }

export default Stat1
