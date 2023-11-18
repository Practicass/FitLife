import ReactApexChart from "react-apexcharts"
import { useEffect, useState } from "react";

import "../css/PageStats.css"
import { Global } from "../helpers/Global";


const Stat1 = () => {

    const [stats, setStats] = useState({dates: [],values:[]})



    const getValues = async() => {

      const request = await fetch(Global.url + "stat/stats/Weight", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")
              
            }
      })

      const data = await request.json()

      let aux=[]
      let aux2=[]

      for( let i=0; i<data.stats.length;i++){
        let fecha = new Date(data.stats[i].date)
        let numeroMes = fecha.getMonth() + 1;

        let numeroDia = fecha.getDate();
        aux2[i] = numeroDia + "/" + numeroMes;
        aux[i] = data.stats[i].value
      }


      setStats({dates:aux2, values:aux})

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
              text: 'Weight',
              align: 'left'
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
              min: Math.min(...stats.values) -1,
              max: Math.max(...stats.values) +1,
              forceNiceScale: true,
              
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
