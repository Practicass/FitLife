import App from "./App"
import ReactDOM from 'react-dom/client'
import "./index.css"
import "./css/main.css";
import "./css/styles.css"
import React from 'react'


import TimeAgo from "javascript-time-ago"
import es from "javascript-time-ago/locale/es.json"
import {NextUIProvider} from "@nextui-org/react";

TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(es)



ReactDOM.createRoot(document.getElementById('root')).render(


    <NextUIProvider>
      <App />
    </NextUIProvider>

  

    
)
