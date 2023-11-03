import React from "react"
import ReactApexChart from "react-apexcharts"
import { useState } from "react";
import "../css/PageStats.css"


const Stat1 = () => {

    const [values, setValues] = useState([])

    const getValues = async() => {

        const request = await fetch(Global.url+"stats/Weight", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")
              
            }
      })

      const data = await request.json()


      setValues(data.stats)

    }

    const [state, setState] = useState({
        series: [
            {
              name: "High - 2013",
              data: [values[0].value, values[1].value]
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
    })


      return (
        <div className="stat">
             <ReactApexChart options={state.options} series={state.series} type="line" />
        </div>
       
      );
    
  }

export default Stat1
