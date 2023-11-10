import ReactApexChart from "react-apexcharts"
import { useEffect, useState } from "react";

import "../css/PageStats.css"
import { Global } from "../helpers/Global";


const Stat1 = () => {

    const [values, setValues] = useState([10,12,8,2,19,17,14])

    const getValues = async() => {

      const request = await fetch(Global.url + "stat/stats/Weight", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")
              
            }
      })

      const data = await request.json()

      let aux

      for( let i=0; i<data.stats.length;i++){
        aux[i] = data.stats[i].value
      }

      console.log(aux)

      setValues(aux)

    }

    useEffect(()=> {
      getValues()
    }, [])
    
    useEffect(()=> {
      console.log(values)
      
    }, [values])

    let state = {
        series: [
            {
              name: "High - 2013",
              data: values
            },
            {
              name: "Low - 2013",
              data: [12, 11, 14, 18, 17, 13, 13]
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
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Average High & Low Temperature',
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
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
              title: {
                text: 'Month'
              }
            },
            yaxis: {
              title: {
                text: 'Temperature'
              },
              min: 5,
              max: 40
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
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
