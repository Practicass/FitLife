import App from "./App"
import ReactDOM from 'react-dom/client'
import "./css/styles.css"
import "./css/main.css";

import TimeAgo from "javascript-time-ago"
import es from "javascript-time-ago/locale/es.json"

TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(es)



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <App />

    
)
